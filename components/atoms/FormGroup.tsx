import React from 'react'

import FormControl from '../atoms/FormControl'

type PROPS_TYPE = {
  name: string
  control: any
  label: string
  type?: string
  rules?: Object
  prepend?: string
  options?: { code: string | undefined; name: string }[]
  hidden?: boolean
  defaultValue?: any
}

export default function FormGroup(props: PROPS_TYPE) {
  return (
    <div className={'mb-[7px] w-full sm:w-1/2 md:mb-[33px] ' + (props.hidden ? 'hidden' : '')}>
      <div className={'mb-2 '}>
        <div className={' font-semibold'}>{props.label}</div>
      </div>
      <FormControl
        defaultValue={props.defaultValue}
        options={props.options}
        prepend={props.prepend}
        name={props.name}
        control={props.control}
        rules={props.rules}
        type={props.type}
        label={props.label}
        inputClass=""
      />
    </div>
  )
}
