import type { DemoThemeId } from "@/lib/demos/themes";

type Props = {
  themeId: DemoThemeId;
  children: React.ReactNode;
  className?: string;
};

export function DemoShell({ themeId, children, className = "" }: Props) {
  return (
    <div
      data-demo={themeId}
      className={`demo-theme grain relative ${className}`.trim()}
    >
      {children}
    </div>
  );
}
