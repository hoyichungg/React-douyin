export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat', // 新功能 feature
                'fix', // 修復 bug
                'docs', // 文件註釋
                'style', // 程式碼格式(不影響程式碼運作的變動)
                'refactor', // 重構(既不增加新功能，也不是修復bug)
                'perf', // 效能最佳化
                'test', // 增加測試
                'chore', // 建置過程或輔助工具的變動
                'revert', // 回退
                'build' // 打包
            ]
        ],
        'subject-case': [0]
    }
};
