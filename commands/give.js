const config = require('../settings.json')
const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    if (config.ownerIDS.includes(message.author.id)) {
        const member = message.mentions.members.first();
        if (!member) return message.channel.send('You need to put a member to give the coins to.')
        if (!args[1]) return message.channel.send('You need to put an amount!')
        if (args[1].isNaN) return;
    if (member.id < 100000000000000000 || member.id > 999999999999999999) return
    let userdataverifyr = await new client.userdata({id:member.id})
    let reqdatauss = await client.userdata.findOne({id:member.id})
    if(!reqdatauss) await userdataverifyr.save()
    let user = await client.userdata.findOne({id:member.id})
    let moneyadd = parseInt(user.money) + parseInt(args[1]);
        client.userdata.findOneAndUpdate({id : user.id},{money: moneyadd},(err)=>{})
        let givesuccess = new Discord.MessageEmbed()
            .setTitle("Shop System")
            .setDescription(`คำสั่งของ : <@` + message.author.id + `>\nเติมเงินให้คุณ <@` + member + `>\n\`\`\`\nเป็นจำนวนเงิน : ${args[1]} บาท\`\`\`\n\`\`\`\nยอดเงินคงเหลือ : ${moneyadd}\`\`\``)
            .setColor('#5cf000')
            .setFooter(config.info, client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send({ embeds : [givesuccess] })

        client.channels.fetch(config.logsroom)
            .then(channel => {
                const logsgive = new Discord.MessageEmbed()
                    .setColor('#5cf000')
                    .setTitle('Shop System Logs')
                    .setDescription('<@' + member + '> ได้รับเงิน\nเป็นจำนวณเงิน : ' + args[1] + ` บาท\n\n\`\`\`\nยอดเงินคงเหลือ : ${moneyadd}\`\`\``)
                    .setTimestamp()
                    .setFooter(config.info, client.user.displayAvatarURL())
                channel.send({ embeds: [logsgive] });
            })
    } else {
        message.channel.send({content:`แกไม่มีสิทธิ์`})
    }
}



module.exports.config = {
    name: "give",
    aliases: []
}