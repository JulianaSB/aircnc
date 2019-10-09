//metodo index = traz lista de sessoes
//metodo show = traz uma sessao
//metodo store = criar uma sessao
//metodo update = alterar uma sessao
//metodo destroy = remover uma sessao
const User = require('../models/User');

module.exports = {
    // a função é assincrona pq pode demorar um tempo para ser executada
    async store(req, res) {
        const { email } = req.body;

        //verifica se existe um usuario com esse email
        let user = await User.findOne({ email });

        if ( !user ) {
            user = await User.create({ email });
        }

        // await so deixar partir para a proxima linha quando a instrução finalizar
        //ou seja quando criar o usuário no banco de dados
        
        return res.json(user);
    }
};