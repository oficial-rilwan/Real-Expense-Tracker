import CurrencyFormat from "react-currency-format";

export default function (props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <CurrencyFormat
      {...other}
      getInputRef={inputRef}
      // prefix={""}
      onValueChange={(values: any) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
    />
  );
}
