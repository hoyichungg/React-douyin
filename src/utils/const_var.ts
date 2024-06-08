export const ApiMethod = {
  REDIRECT: 'redirect',
  // 請求方法
  POST: 'post',
  GET: 'get',
  PATCH: 'patch',
  DELETE: 'delete',
  PUT: 'put',
  PAGE_NUMBER: 1,
  PAGE_SIZE: 10,
  DELAY_TIME: 250,
  SUCCESS: 200,
  RELATE_ENUM: {
    RECOMMEND_NO_REMOVE: -2, //推薦,不能移除
    RECOMMEND: -1, //推薦
    FOLLOW_ME: 1, //只關注我
    FOLLOW_EACH_OTHER: 2, //互相關注
    FOLLOW_HE: 3, //我關注他
    REQUEST_FOLLOW: 4 //關注請求
  }
}

export const SlideType = {
  HORIZONTAL: 0,
  VERTICAL: 1,
  VERTICAL_INFINITE: 2
}

export const SideCardData = [
  {
    title: "常用小程式",

    items: [
      {
        label: "今日頭條",
        image: "https://lf3-static.bytednsdoc.com/obj/eden-cn/pipieh7nupabozups/toutiao_web_pc/tt-icon.png",
        onClick: () => console.log("今日頭條 clicked")
      },
      {
        label: "西瓜視頻",
        image: "https://gd-hbimg.huaban.com/65130a3e6a139530bb03bd118e21a2603af7df4e1303b-OOzcBu_fw658webp",
        onClick: () => console.log("西瓜視頻 clicked")
      }
    ]
  },
  {
    title: "最近常看",
    items: Array.from({ length: 6 }, (_, i) => ({
      label: "隨機名字",
      image: "https://img.tol.vip/avatar/WEIXIN/3aSuTGYTzjHvcHy0y0tH1eiShKRk9Sgd.jpg?_upt=de4a5c251709635127",
      onClick: () => console.log(`Item ${i + 1} clicked`)
    }))
  },
  {
    title: "常用功能",
    items: [
      {
        icon: "ion:wallet-outline",
        label: "我的錢包",
        onClick: () => console.log("我的錢包 clicked")
      },
      {
        icon: "mingcute:coupon-line",
        label: "券包",
        onClick: () => console.log("券包 clicked")
      },
      {
        icon: "icon-park-outline:bytedance-applets",
        label: "小程式",
        onClick: () => console.log("小程式 clicked")
      },
      {
        icon: "solar:history-linear",
        label: "觀看歷史",
        onClick: () => console.log("觀看歷史 clicked")
      },
      {
        icon: "fluent:content-settings-24-regular",
        label: "內容偏好",
        onClick: () => console.log("內容偏好 clicked")
      },
      {
        icon: "iconoir:cloud-download",
        label: "離線模式",
        onClick: () => console.log("離線模式 clicked")
      },
      {
        icon: "ep:setting",
        label: "設定",
        onClick: () => console.log("設定 clicked")
      },
      {
        icon: "icon-park-outline:baggage-delay",
        label: "稍后再看",
        onClick: () => console.log("稍後再看 clicked")
      }
    ]
  }
];
