const { Collection } = require("discord.js");
const Discord = require("discord.js");
const twApi = require('../api/wallet.js');
const config = require('../settings.json')

module.exports.run = async(client, message, args) => {
    
    if (!args[0]) {
        let errornoargs = new Discord.MessageEmbed()
            .setTitle("Shop System")
            .setDescription(`\`\`\`\nส่งคำสังสินค้า ผิดพลาด \n\nCode [ NULL ]\n\nสาเหตุทางลูกค้า\nVOUCHER_OUT_OF_STOCK = มีคนรับไปแล้ว\nVOUCHER_NOT_FOUND = ไม่พบซองในระบบ\nVOUCHER_EXPIRED = ซองวอเลทนี้หมดอายุแล้ว\n\nสาเหตุทางระบบ\nINTERNAL_ERROR = ระบบ API ได้เสียหาย หรือ เกิดจากผู้ใช้เยอะ\nNULL = Code ยังไม่อัปเดต หรือ เกิดข้อผิดพลาด\nTARGET_USER_NOT_FOUND = ไม่พบเบอร์ผู้รับโดเนทในระบบ\nCANNOT_GET_OWN_VOUCHER = รับซองตัวเองไม่ได้\n\n- ขออภัยในเหตุขัดข้อง -\n\`\`\``)
            .setColor('#5cf000')

        .setFooter(config.info, client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send({ embeds: [errornoargs] })
    } else {
        let tw = new twApi(args[0], config.wallet)
        
        let member = message.mentions.members.first() || message.author
        let userdataverifyr = await new client.userdata({id:member.id})
                let reqdatauss = await client.userdata.findOne({id:member.id})
                if(!reqdatauss) await userdataverifyr.save()
                let user = await client.userdata.findOne({id:member.id})
        tw.on('msg', data => {
            console.log(data)
            switch (data.status.code) {
                case "SUCCESS":
                    let moneyadd = parseInt(user.money) + parseInt(data.data.my_ticket.amount_baht);
                    let topupadd = parseInt(user.topup) + parseInt(data.data.my_ticket.amount_baht);
                    client.userdata.findOneAndUpdate({id : user.id},{money: moneyadd},(err)=>{})
                    client.userdata.findOneAndUpdate({id : user.id},{topup: topupadd},(err)=>{})
                    let donatesuccess = new Discord.MessageEmbed()
                        .setTitle("Shop System")
                        .setDescription(`เติมเงินให้คุณ <@` + member.id + `>\n\`\`\`\nรับเงินจากคุณ : ` + data.data.owner_profile.full_name + ` \nจำนวนเงิน : ` + data.data.my_ticket.amount_baht + ` บาท\`\`\``)
                        .setColor('#5cf000')
                        .setFooter(config.info, client.user.displayAvatarURL())
                        .setTimestamp()
                    message.channel.send({ embeds: [donatesuccess] })

                    client.channels.fetch(config.logsroom)
                        .then(channel => {
                            const logstopup = new Discord.MessageEmbed()
                                .setColor('#5cf000')
                                .setTitle('Shop System Logs')
                                .setDescription(`<@${message.author.id}> ได้ทำการ**เติมเงิน** ให้ <@${member.id}>\nเป็นจำนวณเงิน : ${data.data.my_ticket.amount_baht} บาท`)
                                .setTimestamp()
                                .setFooter(config.info, client.user.displayAvatarURL())
                            channel.send({ embeds:[ logstopup] });
                        })
                    break;
                default:
                    let donatedefaultem = new Discord.MessageEmbed()
                        .setTitle("Shop System")
                        .setDescription(`\`\`\`\nส่งคำสังสินค้า ผิดพลาด \n\nCode [ ` + data.status.code + ` ]\n\nสาเหตุทางลูกค้า\nVOUCHER_OUT_OF_STOCK = มีคนรับไปแล้ว\nVOUCHER_NOT_FOUND = ไม่พบซองในระบบ\nVOUCHER_EXPIRED = ซองวอเลทนี้หมดอายุแล้ว\n\nสาเหตุทางระบบ\nINTERNAL_ERROR = ระบบ API ได้เสียหาย หรือ เกิดจากผู้ใช้เยอะ\nNULL = Code ยังไม่อัปเดต หรือ เกิดข้อผิดพลาด\nTARGET_USER_NOT_FOUND = ไม่พบเบอร์ผู้รับโดเนทในระบบ\nCANNOT_GET_OWN_VOUCHER = รับซองตัวเองไม่ได้\n\n- ขออภัยในเหตุขัดข้อง -\n\`\`\``)
                        .setColor('#5cf000')
                        .setFooter(config.info, client.user.displayAvatarURL())
                        .setTimestamp()
                    message.channel.send({ embeds: [donatedefaultem] })
                    break;
            }
        })
    }
}

module.exports.config = {
    name: "topup",
    aliases: [`tu`]
}