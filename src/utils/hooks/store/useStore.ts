import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import enums from '../../enums'
import { friends, panel } from '../../../api/user';

const useStore = create(devtools((set) => ({
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
    init: async () => {
        const panelData = await panel();
        if (panelData.success) {
            set(state => ({ userinfo: { ...state.userinfo, ...panelData.data } }));
        }
        const friendsData = await friends();
        if (friendsData.success) {
            set({ users: friendsData.data });
        }
    },
    setUserinfo: (val) => set({ userinfo: val }),
    setMaskDialog: (val, mode = 'dark') => set({ maskDialog: val, maskDialogMode: mode }),
    updateExcludeNames: (val) => {
        set(state => {
            if (val.type === 'add' && !state.excludeStories.includes(val.value)) {
                return { excludeNames: [...state.excludeNames, val.value] };
            } else {
                return { excludeNames: state.excludeNames.filter(item => item !== val.value) };
            }
        });
    },
    toggleMaskDialog: () => set(state => ({ maskDialog: !state.maskIdalog })),
    updateBodyDimensions: () => set({
        bodyHeight: document.body.clientHeight,
        bodyWidth: document.body.clientWidth
    }),
})));

export default useStore;
