interface DefaultProps {
  className?: string;
  children?: string;
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
