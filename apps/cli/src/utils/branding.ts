import gradient from 'gradient-string';
import pc from 'picocolors';

export const clawsomeGradient = gradient(['#6366f1', '#a855f7', '#06b6d4']);

// Custom Clawsome ASCII art — from clawesome-ascii-art-medium.txt
export const CLAWSOME_ASCII = `
     ╓╗▒R╜╜╜╝Dφ╖_
  _╗╩\`       ╔▒╣╙D╖                               [
 ╔╩        _#╬╬╜\` ╙▒                              ╬H                            ╠▒
j╬     ,╓╔D╬╬╬_    ╙▓       ╓φ▒DDR j▒        ╓▒▒  ╠╬  D▒  DDD▒▒^_φDDR   ╓φD╝╝DK ╬╠  A▒     iDDDDR
╬H  ╒╬╠Ä╬╬╩╬╬╬▓╗_   ╬⌐    ╓╣╜      ╬H      _#╩ ╬H └╬_ ╚╬    #╩  ╬╬,_  ,╬╜      j╠╠H╒╠╬▒    _____
╠H  ▒^"[╝^ \`╚H║╬Ñ   ╬⌐    ╬▒      [╬      ╔╝   ╠╠  ╬▒ ╓╬▒ ╔╬^    \`"╠▒ ╬D       ╬H╠╬╬╩╚╠   ╬╩╙╙╙
'╠  \`≈ ╠    ^  ║'  ╔╩     ╚╬╗╖╓╓  ╬▄╓╓╓ ,╣╜    '╬H [╬#╩╠╬╬╜     ╓╓╗╬\` ╚╠╦,,╓φ [╠ '╠╠  ╠H j╠╓╓╓╓─
 '╬,    \`         4╩        \`\`\`  \`\`\`\`\`  \`       ╬▒  \`\` '╬H     \`\`\`      \`"\`\`  \`   \`\`  ╠╠ \`\`\`\`\`
   ╙D╦_       _╓@╩\`                             [H      ╬                             'H
      '╙╝DKDR╝╙\`                                        \`
`;

export function clearConsole(): void {
  // \x1Bc clears the terminal screen and scrollback buffer
  // \x1B[2J\x1B[3J\x1B[H is another common ANSI sequence for clearing
  process.stdout.write('\x1Bc');
}

export async function displayBranding(version?: string): Promise<void> {
  clearConsole();
  console.log(clawsomeGradient.multiline(CLAWSOME_ASCII));
  if (version) {
    console.log(pc.dim(`  ${version}`));
  }
  console.log(clawsomeGradient('  ──────────────────────────────────────────────────') + '\n');
}

export function displayBrandingSync(version?: string): void {
  clearConsole();
  process.stdout.write(clawsomeGradient.multiline(CLAWSOME_ASCII));
  if (version) {
    process.stdout.write(pc.dim(`  ${version}\n`));
  }
  process.stdout.write(clawsomeGradient('  ──────────────────────────────────────────────────') + '\n\n');
}
