import gradient from 'gradient-string';

export const clawsomeGradient = gradient(['#6366f1', '#a855f7', '#06b6d4']);

// Custom Clawsome ASCII art — from clawesome-ascii-art-medium.txt
const CLAWSOME_ASCII = `
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

export async function displayBranding(): Promise<void> {
  console.log(clawsomeGradient.multiline(CLAWSOME_ASCII));
  console.log(clawsomeGradient('  ─────────────────────────────────────────────') + '\n');
}

export function displayBrandingSync(): void {
  process.stdout.write(clawsomeGradient.multiline(CLAWSOME_ASCII));
  process.stdout.write(clawsomeGradient('  ─────────────────────────────────────────────') + '\n\n');
}
