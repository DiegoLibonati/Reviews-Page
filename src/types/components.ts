export interface Component {
  cleanup?: () => void;
}

export interface ButtonActionComponent extends Component, HTMLButtonElement {}
export interface ButtonActionArrowComponent
  extends Component, HTMLButtonElement {}
export interface ReviewComponent extends Component, HTMLDivElement {}
