import React from 'react'
import { useController } from 'react-hook-form'
type PROPS_TYPE = {
  name: string
  control: any
  rules?: Object
  type?: string
  inputClass?: string
  prepend?: string
  options?: { code: string | undefined; name: string }[]
  defaultValue?: any
  label: string
}

const ERROR_MESSAGES = {
  required: 'This field is required',
  notBusinessEmail: 'Please use a business email',
  pattern: 'Invalid format',
  maxLength: 'Too long',
  minLength: 'Too short',
}

export default function FormControl(props: PROPS_TYPE) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name: props.name,
    control: props.control,
    defaultValue: props.defaultValue,
    rules: props.rules,
  })
  console.log(error?.type)
  let invalidClass = ' !border-[#fa9d9d] '
  const INPUT_BASE_CLASS =
    ' border-p1 border-[1px] form-control focus:border-p1 focus:outline-none h-[45px] sm:h-[58px] text-[#5F6581] px-[15px]  w-full  rounded-[15px] w-full '
  return (
    <>
      <div className={'relative '}>
        {props.prepend && (
          <span
            className={
              'inter-600-16-29 absolute left-2.5 top-1/2 flex -translate-y-1/2 items-center gap-3 text-[#5F6581]'
            }
          >
            {props.prepend}
            <span className={'h-8 w-[1px] bg-[#F3F3F3]'} />
          </span>
        )}

        {!props.options && (
          <input
            placeholder={props.label}
            type={props.type || 'text'}
            className={
              `${INPUT_BASE_CLASS} ${props.inputClass} ` +
              (props.prepend ? ' pl-16 ' : '') +
              (invalid && invalidClass)
            }
            {...field}
          ></input>
        )}
      </div>
      {error && (
        <div>
          <div className={'!text-[#d00]'}>{ERROR_MESSAGES[error.type]}</div>
        </div>
      )}
    </>
  )
}
