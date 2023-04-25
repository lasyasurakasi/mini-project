import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getAuth } from 'firebase/auth'
import { FieldValues, useForm } from 'react-hook-form'
import { v4 } from 'uuid'

import Button from '../components/atoms/Button'
import Input from '../components/atoms/Input'
import Layout from '../components/organisms/Layout'
import { createCycle } from '../firebase/firestore'
const auth = getAuth()
export default function Rent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const router = useRouter()
  useEffect(() => {
    if (!auth.currentUser) {
      router.push('/')
      return
    }
  }, [])
  if (!auth.currentUser) {
    return null
  }
  function onSubmit(data: FieldValues) {
    if (auth.currentUser?.email)
      createCycle({
        id: v4(),
        features: data.features.split(','),
        gear: data.gear,
        model: data.model,
        price: data.price,
        title: data.title,
        host: auth.currentUser.email,
        rating: 0,
        timeAdded: new Date().getTime(),
      }).then(() => {
        alert('Added')
        router.push('/')
      })
  }
  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register('title', {
            required: true,
          })}
          label={'Title'}
          placeholder={'Enter the title'}
          errorCode={errors['title']?.type}
        />
        <Input
          type={'number'}
          register={register('price', {
            required: true,
            valueAsNumber: true,
            min: 1,
            max: 1000,
          })}
          label={'Price per hour'}
          placeholder={'Enter the price per hour'}
          errorCode={errors['price']?.type}
        />
        <Input
          register={register('model', {
            required: true,
          })}
          label={'Model'}
          placeholder={'Enter the Model of the cycle'}
          errorCode={errors['model']?.type}
        />
        <Input
          register={register('features')}
          label={'Features of the cycle, seperated by comma'}
          type={'textarea'}
          placeholder={'Features'}
          errorCode={errors['features']?.type}
        />
        <Input
          register={register('gear')}
          label={'Cycle has gear?'}
          type={'checkbox'}
          placeholder={'Does the cycle have gear'}
          errorCode={errors['gear']?.type}
        />
        <Button variant={'primary'} id={''} type={'submit'}>
          Add Cycle
        </Button>
      </form>
    </Layout>
  )
}
