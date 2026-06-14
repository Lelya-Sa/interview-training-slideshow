#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../content/nova-semiconductor');

function bump(file, from, to, delta) {
  const fp = path.join(root, file);
  let t = fs.readFileSync(fp, 'utf8');
  for (let id = to; id >= from; id--) {
    const oldHeading = `### ${id})`;
    const newHeading = `### ${id + delta})`;
    t = t.split(oldHeading).join(newHeading);
  }
  fs.writeFileSync(fp, t);
  console.log(`Bumped ${file} ${from}-${to} by +${delta}`);
}

bump('code-csharp.md', 45, 66, 8);
bump('sdlc.md', 67, 88, 8);
bump('threading-process.md', 89, 110, 8);
