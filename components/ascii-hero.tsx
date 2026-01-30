export function AsciiHero() {
    return (
      <div className="w-full overflow-hidden mb-12 select-none opacity-80">
        <pre className="text-[10px] md:text-xs leading-[10px] md:leading-3 font-mono text-zinc-600 whitespace-pre-wrap break-all">
  {`
    010101010101010101010101010101010101010101010101010101010101010101
    1  _______  __   __  _______  __   __  _______  ______    _______  1
    0 |       ||  | |  ||       ||  |_|  ||       ||    _ |  |       | 0
    1 |       ||  |_|  ||    _  ||       ||    ___||   | ||  |  _____| 1
    0 |       ||       ||   |_| ||       ||   |___ |   |_||_ | |_____  0
    1 |      _||       ||    ___||       ||    ___||    __  ||_____  | 1
    0 |     |_ |   _   ||   |    | ||_|| ||   |___ |   |  | | _____| | 0
    1 |_______||__| |__||___|    |_|   |_||_______||___|  |_||_______| 1
    0                                                                  0
    1  [ zk-snarks ] [ merkle-trees ] [ distributed-systems ] [ rust ] 1
    010101010101010101010101010101010101010101010101010101010101010101
  `}
        </pre>
      </div>
    );
  }