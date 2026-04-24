interface DefaultProps {
  className?: string | undefined;
  children?: string | undefined;
}

export interface ReviewProps {
  imgSrc: string;
  name: string;
  position: string;
  description: string;
}

export interface ButtonActionProps extends DefaultProps {
  id: string;
  ariaLabel: string;
  onClick: () => void;
}

export interface ButtonActionArrowProps extends DefaultProps {
  id: string;
  ariaLabel: string;
  onClick: () => void;
}
