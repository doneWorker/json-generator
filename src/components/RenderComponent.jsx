const RenderComponent = ({ Elem, onChange }) =>
  Elem ? <Elem onChange={onChange} /> : <></>;

export default RenderComponent;
