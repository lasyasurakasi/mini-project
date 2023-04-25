import { getDownloadURL, getStorage, ref as storageRef, uploadBytes } from '@firebase/storage'

import { app } from './index'

const storage = getStorage(app)

export async function uploadFile(file: File, _path: string) {
  if (!file) return
  const fileRef = storageRef(storage, _path)
  const res = await uploadBytes(fileRef, file)
  return await getDownloadURL(res.ref)
}
