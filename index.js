require('dotenv').config();
const { Client } = require('discord.js');
const data = require('./data');

const client = new Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
//Profil sorgulama
client.on('message', msg => {
    if (msg.content === "profilim/*") {
        const user = msg.author
        const userAvatar = user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 })
        msg.reply(user.username, user.id)
        msg.reply(userAvatar)
    }
})
//konusma
const botTalk = (msj, text) => {
    client.on("message", msg => {
        if (msg.content === text) {
            msg.reply(msj)
        }
    })
}
data.map(item => botTalk(item.cevap, item.soru))

//kullanici profil sorgulama
// message.mentions.users.first().id etkiketlenen kullanıcı id sorgulama
// message.mentions.users.first() etkiketlenen kullanıcı 
client.on('message', message => {
    if (message.content.startsWith('bu kim ?/*')) {
        const mentionedUser = message.mentions.users.first();

        if (mentionedUser) {

            message.channel.send(`${mentionedUser.username}`);
            message.channel.send(`${mentionedUser.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 })}`);
            message.channel.send(`${mentionedUser.id}`);
        } else {
            message.channel.send('Etiketlenmiş bir kullanıcı bulunamadı.');
        }
    }
});

//Admin birşey yazdımı bildirim yapar
let adminStatus = false
client.on("message", msg => {
    if (!adminStatus) {
        const userID = "411571692662685706"
        const user = client.users.cache.get(userID)
        if (user) {
            adminStatus = true
            msg.channel.send("Admin konusuyor dinler misiniz ! @everyone")

        }

    }
})
//metin kanalı temizleme 
client.on('message', async msg => {
    if (msg.content === "temizle/*") {
        const channel = msg.channel//kanalımızı seçiyoruz
        try {
            const fetched = await channel.messages.fetch({ limit: 100 }); // En fazla son 100 mesajı alır
            channel.bulkDelete(fetched)//bulk delete silme işlemi yapar
            msg.channel.send("Admin burayi temizledi ! @everyone")


        } catch (error) {
            console.log(error)
        }
    }
})

client.login(process.env.BOT_TOKEN)