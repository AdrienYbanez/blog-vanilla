module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: 'usage', //permet d'utiliser les polyfills
                corejs: 3, //version de la lib core js 
                debug: true, // permet d'afficher les versions des navigateur ciblés
                targets: "> 30%, not dead" //cible les navigateur pour lesquels je fait de polyfills
            }
        ]
    ]
}