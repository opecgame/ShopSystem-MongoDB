const config = require('../settings.json')
const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    if (config.ownerIDS.includes(message.author.id)) {
        const member = message.mentions.members.first();
        if (!member) return message.channel.send('You need to put a member to give the coins to.')
        if (!args[1]) return message.channel.send('You need to put an amount!')
        if (args[1].isNaN) return;
    let userdataverifyr = await new client.userdata({id:member.id})
    let reqdatauss = await client.userdata.findOne({id:member.id})
    if(!reqdatauss) await userdataverifyr.save()
    let user = await client.userdata.findOne({id:member.id})
    let moneyadd = parseInt(user.money) - parseInt(args[1]);
    if (moneyadd < 0) {
        moneyadd = 0;
    }
        client.userdata.findOneAndUpdate({id : user.id},{money: moneyadd},(err)=>{})
        let paidsuccess = new Discord.MessageEmbed()
            .setTitle("Shop System")
            .setDescription(`คำสั่งของ : <@` + message.author.id + `>\nหักเงินคุณ <@` + member + `>\n\`\`\`\nเป็นจำนวนเงิน : ${args[1]} บาท\`\`\`\n\`\`\`\nยอดเงินคงเหลือ : ${moneyadd}\`\`\``)
            .setColor('#FF0000')
            .setFooter(config.info, client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send({ embeds : [paidsuccess] })

        client.channels.fetch(config.logsroom)
            .then(channel => {
                const logspaid = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Shop System Logs')
                    .setDescription('<@' + member + '> ถูกหักเงิน\nเป็นจำนวณเงิน : ' + args[1] + ` บาท\n\n\`\`\`\nยอดเงินคงเหลือ : ${moneyadd}\`\`\``)
                    .setTimestamp()
                    .setFooter(config.info, client.user.displayAvatarURL())
                channel.send({ embeds: [logspaid] });
            })
    } else {
        message.channel.send({content:`แกไม่มีสิทธิ์`})
    }
}



module.exports.config = {
    name: "paid",
    aliases: []
}