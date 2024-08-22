import { friends, panel } from '../api/user'

export const init = async (set) => {
  const panelData = await panel()
  if (panelData.success) {
    set((state) => ({ userinfo: { ...state.userinfo, ...panelData.data } }))
  }
  const friendsData = await friends()
  if (friendsData.success) {
    set({ users: friendsData.data })
  }
}

export const setUserinfo = (set) => (val) => set({ userinfo: val })

export const setMaskDialog =
  (set) =>
  (val, mode = 'dark') =>
    set({ maskDialog: val, maskDialogMode: mode })

export const updateExcludeNames = (set) => (val) => {
  set((state) => {
    if (val.type === 'add' && !state.excludeNames.includes(val.value)) {
      return { excludeNames: [...state.excludeNames, val.value] }
    } else {
      return { excludeNames: state.excludeNames.filter((item) => item !== val.value) }
    }
  })
}

export const toggleMaskDialog = (set) => () => set((state) => ({ maskDialog: !state.maskDialog }))

export const updateBodyDimensions = (set) => () =>
  set({
    bodyHeight: document.body.clientHeight,
    bodyWidth: document.body.clientWidth
  })

export const setAllRecommendVideos = (set) => (videos) => {
  set(() => ({
    allRecommendVideos: videos
  }))
}
