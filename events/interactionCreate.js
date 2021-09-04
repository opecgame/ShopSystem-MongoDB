const { MessageEmbed, ReactionUserManager, Message, MessageActionRow , MessageButton} = require("discord.js");
const config = require("../settings.json")
module.exports = async (client, interaction) => {
    if (interaction.customId.startsWith("shopitem_")) {
        
        let slice = interaction.customId.startsWith('shopitem_') ? 'shopitem_'.length : 0;
        let args = interaction.customId.slice(slice).split('_');
        let item_id = args.shift().toLowerCase();
        let member = interaction.user; 
        let userdataverifyr = await new client.userdata({ id: member.id })
        let reqdatauss = await client.userdata.findOne({ id: member.id })
        if (!reqdatauss) await userdataverifyr.save()
        
        
        const sold = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId(`shopitem_${item_id}`)
					.setLabel('ขายแล้ว')
					.setStyle('DANGER')
                    .setEmoji('865302398653956096')
                    .setDisabled(true),
			)
            
        let user = await client.userdata.findOne({ id: member.id })
        let item = await client.itemdata.findOne({ id: item_id })
        if(item.sold == true) return await interaction.reply({ embeds: [new MessageEmbed().setTitle('ID นี้ถูกซื้อไปแล้ว').setColor('#FF0000')], ephemeral: true});;
        if(user.money < item.price) return await interaction.reply({ embeds: [new MessageEmbed().setTitle('ยอดเงินของคุณไม่เพียงพอ').setColor('#FF0000')], ephemeral: true});;
        try {
        let moneyafter = parseInt(user.money) - parseInt(item.price)
        let solded = new MessageEmbed().setTitle(`สินค้า ${item.id}`).setDescription(`Username : ${item.username}\nPassword : ||${item.password}||\n\`\`\`\nยอดเงินคงเหลือ : ${moneyafter}\n\`\`\``).setColor(`#00ff00`)
        await interaction.user.send({embeds: [solded]})
        await client.userdata.findOneAndUpdate({id : user.id},{money: moneyafter},(err)=>{})
        await client.itemdata.findOneAndUpdate({id : item_id},{sold: true},(err)=>{})
        
        client.channels.fetch(config.logsroom)
            .then(channel => {
                const logspaid = new MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Shop System Logs')
                    .setDescription(`<@${member.id}> ได้ทำการซื้อสินค้า ${item.id}\nเป็นจำนวณเงิน : ${item.price} บาท\n\n\`\`\`\nยอดเงินคงเหลือ : ${moneyafter}\`\`\``)
                    .setTimestamp()
                    .setFooter(config.info, client.user.displayAvatarURL())
                channel.send({ embeds: [logspaid] });
            })
        await interaction.message.edit({components: [sold]})
        
        await interaction.deferUpdate();
    } catch(err) {
        await interaction.reply({ embeds: [new MessageEmbed().setTitle('กรุณาเปิด DM').setColor('#FF0000')], ephemeral: true});;
    }
    }
}
