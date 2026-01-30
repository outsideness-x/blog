export function AsciiHero() {
  // wide version for desktop screens
  const WIDE = String.raw`0101010101010101010101010101010101010101010101010101010101010101010101
1                                                                       0
0   o───o      o──────────────o        o──────────────o      o───o      1
1   │   │      │              │        │              │      │   │      0
0   o───┴──o───o   ┌──────────┴────────┴──────────┐   o───o──┴───o      1
1           │       │   ┌───────┐      ┌───────┐   │       │             0
0   o───o───o       │  /       /|     /       /|   │       o───o───o     1
1   │   │           │ /_______/ |    /_______/ |   │           │   │     0
0   o───┘   o───o   │ |       | |    |       | |   │   o───o   └───o     1
1         ┌─┴─┐ │   │ |  ███  | /    |  ███  | /   │   │ ┌─┴─┐           0
0   o───o │   │ o───o |       |/     |       |/    o───o │   │ o───o     1
1   │   │ └─┬─┘      │  ──┬───┘      └───┬───  │      └─┬─┘ │   │      0
0   o───o───o        │    │   ╔═══════════╗     │        o───o───o       1
1                    │    │   ║ ░▒▓█▓▒░▒▓█ ║     │                      0
0   ┌───┐──┬──┌───┐  │    │   ╚═══════════╝     │  ┌───┐──┬──┌───┐      1
1   │▒▒▒│  │  │▒▒▒│  └────┴──────────┬──────────┘  │▒▒▒│  │  │▒▒▒│      0
0   └───┘──┴──└───┘                  │             └───┘──┴──└───┘      1
1                                                                       0
0101010101010101010101010101010101010101010101010101010101010101010101`;

  // compact version for mobile screens
  const COMPACT = String.raw`010101010101010101010101010101010101
1   o──o     ┌──────┐     o──o      0
0   │  │  o──┤ ┌──┐ ├──o  │  │      1
1   o──┴──┤  └─┴──┴─┘  ├──┴──o      0
0         │  /____/|   │             1
1  ┌───┐──┼──|    | |──┼──┌───┐      0
0  │▒▒▒│  │  |____|/   │  │▒▒▒│      1
1  └───┘──┴─────┬──────┴──└───┘      0
0        ┌──────┴──────┐              1
1        └─────────────┘              0
010101010101010101010101010101010101`;

  return (
    <div className="w-full mb-12 select-none">
      <div className="overflow-x-auto no-scrollbar">
        {/* desktop view */}
        <pre className="ascii-glow hidden md:block whitespace-pre font-mono text-[10px] md:text-xs leading-[10px] md:leading-4 text-zinc-200 opacity-90">
          {WIDE}
        </pre>
        {/* mobile view */}
        <pre className="ascii-glow md:hidden whitespace-pre font-mono text-[10px] leading-[10px] text-zinc-200 opacity-90">
          {COMPACT}
        </pre>
      </div>
    </div>
  );
}