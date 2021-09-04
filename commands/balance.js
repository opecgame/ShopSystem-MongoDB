const config = require('../settings.json');
const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    const member = message.mentions.members.first() || message.author;
    let userdataverifyr = await new client.userdata({id:member.id})
                let reqdatauss = await client.userdata.findOne({id:member.id})
                if(!reqdatauss) await userdataverifyr.save()
                let user = await client.userdata.findOne({id:member.id})
        let bal = new Discord.MessageEmbed()
            .setTitle("Shop System")
            .setDescription(`ยอดเงินของ : <@` + member.id + `>\n\`\`\`\nคงเหลือ : ${user.money} บาท\nเติมเงินทั้งสิ้น : ${user.topup} บาท\`\`\``)
            .setColor('#5cf000')
            .setFooter(config.info, client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send({ embeds: [bal] })
}

module.exports.config = {
    name: "balance",
    aliases: [`bal`, `money`]
}