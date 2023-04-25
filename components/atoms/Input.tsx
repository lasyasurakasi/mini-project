import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form'
const ERROR_MESSAGES = {
  required: 'This field is required',
  minLength: 'Length should be greator than 5',
  invalid: 'Invalid Credentials',
  'auth/user-not-found': 'No such user found! Please Sign Up!',
}
export default function Input({
  register,
  label,
  errorCode,
  placeholder,
  type,
}: {
  register: UseFormRegisterReturn
  label?: string
  placeholder?: string
  errorCode?: string
  type?: any
}) {
  let Component: any = 'input'
  if (type === 'textarea') Component = 'textarea'
  return (
    <div>
      <div>{label}</div>
      <Component type={type} placeholder={placeholder} {...register} />
      <small>{ERROR_MESSAGES[errorCode as keyof typeof ERROR_MESSAGES]}</small>
    </div>
  )
}
