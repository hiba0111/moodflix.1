import { memo, ReactNode } from "react";

interface AnimatedResultsContainerProps {
  children: ReactNode;
  isLoading?: boolean;
}

const AnimatedResultsContainer = memo(function AnimatedResultsContainer({
  children,
  isLoading = false,
}: AnimatedResultsContainerProps) {
  return (
    <div
      className={`animate-in fade-in ${isLoading ? "opacity-50" : "opacity-100"}`}
      style={{ animationDuration: "300ms" }}
    >
      {children}
    </div>
  );
});

export default AnimatedResultsContainer;
