import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import enums from '../utils/enums'
// import { friends, panel } from '../api/user';
import {
    init,
    setUserinfo,
    setMaskDialog,
    updateExcludeNames,
    toggleMaskDialog,
    updateBodyDimensions,
    setAllRecommendVideos
} from '../actions/actions';

const useStore = create(devtools((set) => ({
    allRecommendVideos: [],
    bodyHeight: document.body.clientHeight,
    bodyWidth: document.body.clientWidth,
    maskDialog: false,
    maskDialogMode: 'dark',
    version: '17.1.0',
    excludeNames: [],
    judgeValue: 20,
    homeRefresh: 60,
    loading: false,
    routeData: null,
    users: [],
    userinfo: {
        nickname: '',
        desc: '',
        user_age: '',
        signature: '',
        unique_id: '',
        province: '',
        city: '',
        gender: '',
        school: {
            name: '',
            department: null,
            joinTime: null,
            education: null,
            displayType: enums.DISPLAY_TYPE.ALL
        },
        avatar_168x168: {
            url_list: []
        },
        avatar_300x300: {
            url_list: []
        },
        cover_url: [{
            url_list: []
        }],
        white_cover_url: [{
            url_list: []
        }]
    },
    friends: [],

    // Actions
    init: () => init(set),
    setUserinfo: setUserinfo(set),
    setMaskDialog: setMaskDialog(set),
    updateExcludeNames: updateExcludeNames(set),
    toggleMaskDialog: toggleMaskDialog(set),
    updateBodyDimensions: updateBodyDimensions(set),
    setAllRecommendVideos: setAllRecommendVideos(set)
})));

export default useStore;
