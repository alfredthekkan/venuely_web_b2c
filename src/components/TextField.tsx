type TextFieldProps = {
  label?: string;
  placeholder?: string;
};

function TextField({ label, placeholder }: TextFieldProps) {
  return (
    <div>
      {label && <label className="block mb-1">{label}</label>}
      <input type="text" className="border p-2 rounded" placeholder={placeholder} />
    </div>
  );
}
export default TextField;