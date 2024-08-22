import { useEffect } from 'react'
import useStore from '../../store/useStore'

import { _fetch } from '../_fetch'
import { cloneDeep } from '../cloneDeep'

import { BASE_URL } from '../../config'

const useFetchData = () => {
  const baseStore = useStore()

  useEffect(() => {
    async function fetchData() {
      console.log('baseStore', baseStore)

      const r = await _fetch(BASE_URL + '/data/videos.md')
      console.log('r', r)

      const v = await r.json()
      console.log('b', v)

      console.log('234', baseStore.users)
      let userList = cloneDeep(baseStore.users)
      if (!userList.length) {
        await baseStore.init()
        userList = cloneDeep(baseStore.users)
      }

      const updatedVideos = v.map((w) => {
        // console.log('w', w);

        w.type = 'recommend-video'
        const item = userList.find((a) => String(a.uid) === String(w.author_user_id))
        if (item) w.author = item
        return w
      })

      console.log('updatedVideos', updatedVideos)

      baseStore.setAllRecommendVideos((prevVideos) => prevVideos.concat(updatedVideos))
      // console.log('baseStore', baseStore);
    }

    fetchData()
  }, [])
}

export default useFetchData
