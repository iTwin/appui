import React from "react";

export function DarkModeBackgroundWrapper({ isDark, children }: { isDark: boolean; children: React.ReactNode }) {
  // Apply background color based on dark mode
  React.useEffect(() => {
    const background = isDark ? "#1a1a1a" : "white";
    document.body.style.backgroundColor = background;

    // Find Storybook's docs root and canvas
    const docsRoot = document.querySelector(".sb-show-main");
    if (docsRoot instanceof HTMLElement) {
      docsRoot.style.backgroundColor = background;
    }
  }, [isDark]);

  return <>{children}</>;
}
