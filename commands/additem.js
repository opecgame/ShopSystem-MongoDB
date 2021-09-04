const config = require('../settings.json')
const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    if (config.ownerIDS.includes(message.author.id)) {
        message.delete()
        if (!args[0]) return message.channel.send({embeds:[new Discord.MessageEmbed().setTitle(`กรุณากรอก ID`).setColor(`#ff0000`)]})
        if (!args[1]) return message.channel.send({embeds:[new Discord.MessageEmbed().setTitle(`กรุณากรอก ราคา`).setColor(`#ff0000`)]})
        if (!args[2]) return message.channel.send({embeds:[new Discord.MessageEmbed().setTitle(`กรุณากรอก รายละเอียด (ห้ามเว้นวรรค)`).setColor(`#ff0000`)]})
        if (!args[3]) return message.channel.send({embeds:[new Discord.MessageEmbed().setTitle(`กรุณากรอก รายละเอียด เจ้าของรหัส`).setColor(`#ff0000`)]})
        if (!args[4]) return message.channel.send({embeds:[new Discord.MessageEmbed().setTitle(`กรุณากรอกลิงก์รูปภาพ`).setColor(`#ff0000`)]})
        if (!args[5]) return message.channel.send({embeds:[new Discord.MessageEmbed().setTitle(`กรุณากรอก Username`).setColor(`#ff0000`)]})
        if (!args[6]) return message.channel.send({embeds:[new Discord.MessageEmbed().setTitle(`กรุณากรอก รหัสผ่าน`).setColor(`#ff0000`)]})
        let reqdatait = await client.itemdata.findOne({id:args[0]})
    if(reqdatait) return message.channel.send({embeds:[new Discord.MessageEmbed().setTitle(`มี ID นี้ในระบบแล้ว`).setColor(`#ff0000`)]})
    let dataitem = await new client.itemdata({
        id:args[0].toLowerCase(),
        price:args[1],
        info:args[2],
        username:args[5],
        password:args[6]
    })
    await dataitem.save()
    const success = new Discord.MessageEmbed()
    .setTitle(`สินค้า ${args[0]}`)
    .setDescription(`ทำการสร้างสำเร็จ`)
    const embed = new Discord.MessageEmbed()
    .setTitle(`ชื่อสินค้า ${args[0]}`)
    .setDescription(`ราคา : ${args[1]} บาท\nรายละเอียด : ${args[2]}\nเจ้าของรหัส : ${args[3]}`)
    .setImage(`${args[4]}`)
    const rowshop = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setCustomId(`shopitem_${args[0].toLowerCase()}`)
					.setLabel('ซือ')
					.setStyle('SUCCESS')
                    .setEmoji('865302398653956096'),
			)
    message.channel.send({embeds: [success]})
    let guild_own = await client.guilds.cache.get(config.guildid);
    let channel_ = await guild_own.channels.cache.get(config.shoproom);
    channel_.send({embeds: [embed], components: [rowshop]})
    } else {
        message.channel.send({embeds:[new Discord.MessageEmbed().setTitle(`แก ไม่ มี สิทธ์ !!!`).setColor(`#ff0000`)]})
    }
}



module.exports.config = {
    name: "addid",
    aliases: []
}
