#!/usr/bin/env node
// Regenerates src/constants/resume.js from the Typeset base resume.
//
//   npm run resume:sync      write resume.js from the source
//   npm run resume:check     exit 1 if resume.js is out of sync
//   npm run resume:publish   sync, build, confirm, then PR + squash-merge to main
//                            (merging deploys xinyiklin.com); --yes skips the prompt
//
// The source is a local, gitignored file in the sibling role-fit-ai repo, so this
// runs on your machine only; CI builds the committed resume.js.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = resolve(ROOT, process.env.RESUME_SOURCE ?? "../role-fit-ai/apps/role-fit-ai/workspace/resumes/default.resume");
const TARGET_REL = "src/constants/resume.js";
const TARGET = resolve(ROOT, TARGET_REL);
const FLAGS = ["--check", "--publish", "--yes"];
// Seven or more digits joined only by phone punctuation. Dates ("Jul 2022 –
// Aug 2022") and counts ("480+") never match.
const PHONE_DIGITS = /\d(?:[\s().+-]*\d){6,}/;

class ResumeError extends Error {}
const reject = (message) => {
    throw new ResumeError(message);
};

function plain(value, where) {
    if (typeof value !== "string") reject(`${where} is missing`);
    let text = value;
    for (let prev; prev !== text; ) {
        prev = text;
        text = text.replace(/<(b|i)>([^<]*)<\/\1>/g, "$2");
    }
    text = text.trim();
    if (/[<>]/.test(text)) reject(`unsupported markup in ${where}: ${value}`);
    return text;
}

function parseLink(value, where) {
    const match = /^<link=([^>]+)>([^<]*)<\/link>$/.exec(value.trim());
    if (!match) reject(`expected a single link in ${where}, got: ${value}`);
    let href;
    try {
        href = decodeURIComponent(match[1]);
    } catch {
        reject(`bad link encoding in ${where}: ${value}`);
    }
    if (!/^(https:|mailto:)/.test(href)) reject(`only https: and mailto: links are published (${where}): ${href}`);
    return { label: match[2].trim(), href };
}

// Bullets may bold phrases with <b>; anything else would be lost, so refuse it.
function toSegments(text, where) {
    if (typeof text !== "string") reject(`${where} is missing`);
    const segments = [];
    for (const part of text.split(/(<b>[^<]*<\/b>)/)) {
        if (!part) continue;
        const bold = /^<b>[^<]*<\/b>$/.test(part);
        const value = bold ? part.slice(3, -4) : part;
        if (/[<>]/.test(value)) reject(`unsupported markup in ${where}: ${text}`);
        segments.push(bold ? { text: value, bold: true } : { text: value });
    }
    return segments;
}

// Fields the site does not render must be empty, or the edit would vanish.
function unused(item, fields, where) {
    for (const field of fields) {
        const value = item[field];
        if (Array.isArray(value) ? value.length : value) reject(`${where} has "${field}", which the site does not show`);
    }
}

function section(sections, heading) {
    const found = sections.find((s) => s.heading === heading);
    if (!found) reject(`source has no "${heading}" section`);
    return found.items.map((item, i) => [item, `${heading} item ${i + 1}`]);
}

function convert(doc) {
    const { header, sections } = doc;
    if (header?.visible === false) reject("source header is hidden");
    const known = ["Technical Skills", "Projects", "Experience", "Education"];
    const extra = sections.map((s) => s.heading).filter((h) => !known.includes(h));
    if (extra.length) reject(`unmapped source sections: ${extra.join(", ")}`);

    // The phone is the only contact kept off the public site.
    const contact = header.contact.map((c) => c.trim()).filter((c) => !/^\+?[\d\s().-]{7,}$/.test(c));
    const places = contact.filter((c) => !c.startsWith("<link="));
    if (places.length !== 1) reject(`expected one plain-text location in header, got: ${places.join(" | ")}`);

    const bullets = (item, where) =>
        item.bullets.map((b, i) => ({ segments: toSegments(b.text, `${where} bullet ${i + 1}`) }));
    const linksIn = (value, where) => (value ? [parseLink(value, where)] : []);
    return {
        RESUME_HEADER: {
            name: plain(header.name, "header name"),
            location: plain(places[0], "header location"),
            links: contact.filter((c) => c.startsWith("<link=")).map((c) => parseLink(c, "header")),
        },
        RESUME_SKILLS: section(sections, "Technical Skills").map(([item, where]) => {
            unused(item, ["titleRight", "subtitleRight", "bullets"], where);
            return { label: plain(item.titleLeft, where), value: plain(item.subtitleLeft, where) };
        }),
        RESUME_PROJECTS: section(sections, "Projects").map(([item, where]) => ({
            name: plain(item.titleLeft, where),
            dates: plain(item.titleRight, where),
            stack: plain(item.subtitleLeft, where),
            links: linksIn(item.subtitleRight, where),
            bullets: bullets(item, where),
        })),
        RESUME_EXPERIENCE: section(sections, "Experience").map(([item, where]) => ({
            role: plain(item.titleLeft, where),
            org: plain(item.subtitleLeft, where),
            location: plain(item.subtitleRight, where),
            dates: plain(item.titleRight, where),
            bullets: bullets(item, where),
        })),
        RESUME_EDUCATION: section(sections, "Education").map(([item, where]) => {
            unused(item, ["bullets"], where);
            return {
                school: plain(item.titleLeft, where),
                degree: plain(item.subtitleLeft, where),
                location: plain(item.subtitleRight, where),
                dates: plain(item.titleRight, where),
            };
        }),
    };
}

// Last line of defense: no phone-like number anywhere in the public output.
function assertNoPhone(value) {
    if (typeof value === "string") {
        if (PHONE_DIGITS.test(value)) reject(`phone-like number would be published: ${value}`);
    } else if (value && typeof value === "object") {
        Object.values(value).forEach(assertNoPhone);
    }
}

// Emits the same hand-written layout resume.js has always used: one line per
// link, skill, and bullet; objects and arrays otherwise expanded.
function emit(value, indent = "") {
    const inner = indent + "    ";
    if (typeof value === "string") return JSON.stringify(value);
    if (typeof value === "boolean") return String(value);
    const inline = (obj) =>
        `{ ${Object.entries(obj).map(([k, v]) => `${k}: ${emit(v)}`).join(", ")} }`;
    if (Array.isArray(value)) {
        if (!value.length) return "[]";
        // Two-field string pairs (links, skills) stay on one line; entries expand.
        const flat = value.every(
            (v) => Object.keys(v).length <= 2 && Object.values(v).every((x) => typeof x === "string")
        );
        const lines = value.map((v) => {
            if (flat) return inline(v);
            if (v.segments) return `{ segments: [${v.segments.map(inline).join(", ")}] }`;
            return emit(v, inner);
        });
        return `[\n${lines.map((l) => `${inner}${l},`).join("\n")}\n${indent}]`;
    }
    const lines = Object.entries(value).map(([k, v]) => `${inner}${k}: ${emit(v, inner)},`);
    return `{\n${lines.join("\n")}\n${indent}}`;
}

function render() {
    let doc;
    try {
        doc = JSON.parse(readFileSync(SOURCE, "utf8")).document;
    } catch (error) {
        reject(`cannot read ${SOURCE}: ${error.message}`);
    }
    let data;
    try {
        data = convert(doc);
    } catch (error) {
        if (error instanceof ResumeError) throw error;
        reject(`source does not have the expected Typeset shape (${error.message})`);
    }
    assertNoPhone(data);
    const head = [
        "// Generated from the Typeset base resume by scripts/sync-resume.mjs",
        "// (npm run resume:sync). Edit the source, not this file:",
        `// ${relative(ROOT, SOURCE)}`,
        "// Section order follows the source: Skills, Projects, Experience, Education.",
        "// The source's phone number is intentionally left off this public site.",
    ].join("\n");
    const body = Object.entries(data)
        .map(([name, value]) => `export const ${name} = ${emit(value)};`)
        .join("\n\n");
    return `${head}\n\n${body}\n`;
}

const run = (cmd, args, opts = {}) =>
    execFileSync(cmd, args, { cwd: ROOT, encoding: "utf8", stdio: opts.quiet ? "pipe" : "inherit" });
const git = (...args) => run("git", args, { quiet: true }).trim();

async function confirm() {
    if (process.argv.includes("--yes")) return true;
    if (!process.stdin.isTTY) reject("publish needs a terminal to confirm; pass --yes to skip the prompt");
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const answer = await rl.question("\nPublish this to xinyiklin.com? [y/N] ");
    rl.close();
    return ["y", "yes"].includes(answer.trim().toLowerCase());
}

async function publish(next) {
    if (git("rev-parse", "--abbrev-ref", "HEAD") !== "main") reject("switch to main before publishing");
    if (git("status", "--porcelain")) reject("working tree is not clean; commit or stash first");
    run("git", ["pull", "--ff-only"]);
    // Only the resume may ride along: unpushed local commits would be merged too.
    if (git("rev-list", "--count", "@{u}..HEAD") !== "0") reject("main has unpushed commits; push or drop them first");

    if (readFileSync(TARGET, "utf8") === next) {
        console.log("resume: already in sync, nothing to publish");
        return;
    }
    writeFileSync(TARGET, next);
    const restore = () => run("git", ["checkout", "--", TARGET_REL]);
    try {
        run("npm", ["run", "build"]);
    } catch {
        restore();
        reject(`build failed; ${TARGET_REL} was restored`);
    }
    run("git", ["--no-pager", "diff", "--", TARGET_REL]);
    if (!(await confirm())) {
        restore();
        console.log("resume: not published; resume.js restored (npm run resume:sync updates it locally)");
        return;
    }

    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const branch = `docs/resume-sync-${date.replace(/-/g, "")}-${pad(now.getHours())}${pad(now.getMinutes())}`;
    const title = `docs(resume): sync resume mirror with the ${date} base resume`;
    const steps = [
        ["created the branch", "git", ["switch", "-c", branch]],
        ["staged the resume", "git", ["add", "--", TARGET_REL]],
        ["committed", "git", ["commit", "-m", title]],
        ["pushed the branch", "git", ["push", "-u", "origin", branch]],
        ["opened the PR", "gh", ["pr", "create", "--base", "main", "--head", branch, "--title", title,
            "--body", "Generated by `npm run resume:publish` from the Typeset base resume; local build passed and the diff was confirmed before publishing."]],
        ["merged the PR", "gh", ["pr", "merge", branch, "--squash", "--delete-branch"]],
    ];
    const done = [];
    for (const [label, cmd, args] of steps) {
        try {
            run(cmd, args);
        } catch {
            console.error(`\nresume: publish stopped before "${label}". Already done: ${done.join(", ") || "nothing"}.`);
            console.error(`Current branch: ${git("rev-parse", "--abbrev-ref", "HEAD")}. Nothing reached main.`);
            console.error(`To start over: git switch main && git branch -D ${branch}` +
                (done.includes("pushed the branch") ? ` && git push origin --delete ${branch} (close the PR first if one is open)` : ""));
            process.exit(1);
        }
        done.push(label);
    }
    if (git("rev-parse", "--abbrev-ref", "HEAD") !== "main") run("git", ["switch", "main"]);
    run("git", ["pull", "--ff-only"]);
    console.log("resume: merged to main; the Pages deploy is running (check the Actions tab)");
}

async function main() {
    const unknown = process.argv.slice(2).filter((a) => !FLAGS.includes(a));
    if (unknown.length) reject(`unknown option ${unknown.join(" ")} (use ${FLAGS.join(", ")})`);
    const next = render();
    const current = readFileSync(TARGET, "utf8");
    if (process.argv.includes("--check")) {
        if (current !== next) reject(`${TARGET_REL} is out of sync; run npm run resume:sync`);
        console.log("resume: in sync");
    } else if (process.argv.includes("--publish")) {
        await publish(next);
    } else if (current === next) {
        console.log("resume: already in sync");
    } else {
        writeFileSync(TARGET, next);
        console.log(`resume: updated ${TARGET_REL}`);
    }
}

main().catch((error) => {
    console.error(`resume: ${error instanceof ResumeError ? error.message : error.stack}`);
    process.exit(1);
});
