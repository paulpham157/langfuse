import { Button } from "@/src/components/ui/button";
import { copyTextToClipboard } from "@/src/utils/clipboard";
import { cn } from "@/src/utils/tailwind";
import { Check, Copy } from "lucide-react";
import { type FC, memo, useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

interface Props {
  language: string;
  value: string;
  theme?: string;
  className?: string;
}

interface languageMap {
  [key: string]: string;
}

export const programmingLanguages: languageMap = {
  javascript: ".js",
  python: ".py",
  java: ".java",
  c: ".c",
  cpp: ".cpp",
  "c++": ".cpp",
  "c#": ".cs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  "objective-c": ".m",
  kotlin: ".kt",
  typescript: ".ts",
  go: ".go",
  perl: ".pl",
  rust: ".rs",
  scala: ".scala",
  haskell: ".hs",
  lua: ".lua",
  shell: ".sh",
  sql: ".sql",
  html: ".html",
  css: ".css",
  // add more file extensions here, make sure the key is same as language prop in CodeBlock.tsx component
};

const CodeBlock: FC<Props> = memo(({ language, value, theme, className }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    setIsCopied(true);
    void copyTextToClipboard(value ?? "");
    setTimeout(() => setIsCopied(false), 1000);
  };

  return (
    <div className="codeblock relative w-full overflow-hidden rounded border font-sans dark:bg-zinc-950">
      <div
        className={cn(
          "flex w-full items-center justify-between bg-secondary px-2",
          className,
        )}
      >
        <span className="text-xs lowercase">{language}</span>
        <div className="flex items-center py-1">
          <Button
            variant="ghost"
            size="xs"
            className="text-xs hover:bg-border focus-visible:ring-1 focus-visible:ring-offset-0"
            onClick={handleCopy}
          >
            {isCopied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
      </div>
      <Highlight
        theme={theme === "dark" ? themes.vsDark : themes.github}
        code={value}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              margin: 0,
              width: "100%",
              background: "transparent",
              padding: "0.5rem",
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              overflow: "auto",
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
});
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
