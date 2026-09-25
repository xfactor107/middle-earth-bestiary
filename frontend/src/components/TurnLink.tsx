import { Link, type LinkProps } from "react-router";
import { usePageTurn, type TurnDirection } from "../routes/pageTurn";

interface TurnLinkProps extends Omit<LinkProps, "to"> {
  to: string;
  direction?: TurnDirection;
}

// A link that turns the page. Still a real <a href>, so opening in a new tab,
// copying the address and modified clicks all behave as normal.
export default function TurnLink({ to, direction = "forward", onClick, ...rest }: TurnLinkProps) {
  const turn = usePageTurn();

  return (
    <Link
      to={to}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
          return;
        }
        e.preventDefault();
        turn(to, direction);
      }}
    />
  );
}
