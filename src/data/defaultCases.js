// CS:GO Food Rarity & Preset Cases Definition

export const RARITIES = {
  consumer: {
    id: 'consumer',
    name: 'Consumer Grade',
    vnName: 'Phổ thông (Trắng)',
    color: '#b0c3d9',
    borderColor: '#94a3b8',
    bgColor: 'rgba(148, 163, 184, 0.15)',
    textColor: 'text-slate-300',
    weight: 45, // Roll weight
  },
  industrial: {
    id: 'industrial',
    name: 'Industrial Grade',
    vnName: 'Bình dân (Lam nhạt)',
    color: '#5e98d9',
    borderColor: '#38bdf8',
    bgColor: 'rgba(56, 189, 248, 0.15)',
    textColor: 'text-sky-400',
    weight: 28,
  },
  milspec: {
    id: 'milspec',
    name: 'Mil-Spec Grade',
    vnName: 'Quân sự (Xanh dương)',
    color: '#4b69ff',
    borderColor: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.18)',
    textColor: 'text-blue-400',
    weight: 15,
  },
  restricted: {
    id: 'restricted',
    name: 'Restricted',
    vnName: 'Hạn chế (Tím)',
    color: '#8847ff',
    borderColor: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.2)',
    textColor: 'text-purple-400',
    weight: 7,
  },
  classified: {
    id: 'classified',
    name: 'Classified',
    vnName: 'Bảo mật (Hồng)',
    color: '#d32ce6',
    borderColor: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.22)',
    textColor: 'text-pink-400',
    weight: 3.5,
  },
  covert: {
    id: 'covert',
    name: 'Covert',
    vnName: 'Tối mật (Đỏ)',
    color: '#eb4b4b',
    borderColor: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.25)',
    textColor: 'text-red-500',
    weight: 1.2,
  },
  gold: {
    id: 'gold',
    name: 'Special Rare Item ★',
    vnName: 'Cực Phẩm Dao Vàng ★',
    color: '#ffd700',
    borderColor: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.3)',
    textColor: 'text-amber-400',
    weight: 0.3,
  },
}

export const DEFAULT_CASES = [
  {
    id: 'office-lunch',
    name: 'Hòm Bữa Trưa Văn Phòng',
    tagline: 'Cứu cánh giờ trưa cho dân công sở',
    icon: '💼',
    badge: 'Standard Case',
    bannerColor: 'from-blue-900/60 to-slate-950',
    items: [
      {
        id: 'com-binh-dan',
        name: 'Cơm Bình Dân 35k',
        rarity: 'consumer',
        emoji: '🍱',
        desc: '3 món tự chọn, canh rau muống luộc, thêm bát nước mắm ớt thần thánh.',
        calories: 600,
        price: '30.000 - 35.000đ',
        wear: 'Field-Tested (Đã qua thử lửa)'
      },
      {
        id: 'banh-mi-pate',
        name: 'Bánh Mì Kẹp Pate Trứng',
        rarity: 'consumer',
        emoji: '🥖',
        desc: 'Giòn rụm bên ngoài, béo ngậy bên trong. Cứu rỗi những ngày cháy túi.',
        calories: 450,
        price: '20.000 - 25.000đ',
        wear: 'Minimal Wear (Ít hao mòn)'
      },
      {
        id: 'mi-tom-trung',
        name: 'Mì Tôm Hảo Hảo Trứng Trần',
        rarity: 'consumer',
        emoji: '🍜',
        desc: 'Hương vị huyền thoại cứu đói cuối tháng, chua cay quen thuộc.',
        calories: 420,
        price: '15.000 - 20.000đ',
        wear: 'Well-Worn (Nồi niêu nhuốm màu)'
      },
      {
        id: 'pho-bo-tai',
        name: 'Phở Bò Tái Nạm',
        rarity: 'industrial',
        emoji: '🍲',
        desc: 'Nước dùng trong veo thanh ngọt hầm từ xương bò suốt 12 tiếng.',
        calories: 550,
        price: '45.000 - 55.000đ',
        wear: 'Factory New (Mới xuất xưởng)'
      },
      {
        id: 'com-tam-suon',
        name: 'Cơm Tấm Sườn Bì Chả',
        rarity: 'industrial',
        emoji: '🍛',
        desc: 'Miếng sườn nướng mỡ hành óng ánh, kèm nước mắm kẹo đậm đà.',
        calories: 750,
        price: '45.000 - 60.000đ',
        wear: 'Factory New (Óng ánh mỡ hành)'
      },
      {
        id: 'bun-cha-ha-noi',
        name: 'Bún Chả Hà Nội Than Hoa',
        rarity: 'industrial',
        emoji: '🥗',
        desc: 'Chả miếng, chả viên nướng xém cạnh thơm phức chấm nước mắm giấm ớt.',
        calories: 580,
        price: '45.000 - 55.000đ',
        wear: 'Factory New (Khói than nghi ngút)'
      },
      {
        id: 'bun-dau-mam-tom',
        name: 'Bún Đậu Mắm Tôm Mẹt To',
        rarity: 'milspec',
        emoji: '🥘',
        desc: 'Đậu mơ rán giòn, chả cốm dẻo quánh, dồi sụn nướng, mắm tôm đánh bông bọt.',
        calories: 700,
        price: '55.000 - 75.000đ',
        wear: 'Field-Tested (Ăn xong nhớ xúc miệng)'
      },
      {
        id: 'com-ga-xoi-mo',
        name: 'Cơm Gà Xối Mỡ Da Giòn',
        rarity: 'milspec',
        emoji: '🍗',
        desc: 'Góc đùi gà chiên da ròn rụm màu cánh gián, cơm chiên cà chua thơm lừng.',
        calories: 820,
        price: '50.000 - 65.000đ',
        wear: 'Factory New (Giòn rụm)'
      },
      {
        id: 'pizza-combo',
        name: 'Combo Pizza & Mì Ý',
        rarity: 'restricted',
        emoji: '🍕',
        desc: 'Phô mai kéo sợi ngập tràn, sốt cà chua thịt băm béo ngậy.',
        calories: 900,
        price: '99.000 - 130.000đ',
        wear: 'Minimal Wear (Ngon khó cưỡng)'
      },
      {
        id: 'ga-ran-kfc',
        name: 'Mẹt Gà Rán Giòn Cay Sốt Mật Ong',
        rarity: 'restricted',
        emoji: '🍗',
        desc: 'Lớp vỏ bột tẩm gia vị độc quyền, thịt gà mọng nước không bị khô.',
        calories: 850,
        price: '85.000 - 120.000đ',
        wear: 'Factory New (Nóng hổi vừa thổi vừa ăn)'
      },
      {
        id: 'buffet-nuong-kpub',
        name: 'Set Nướng Thịt Dẻ Sườn Bò BBQ',
        rarity: 'classified',
        emoji: '🥩',
        desc: 'Thịt bò vân mỡ xèo xèo trên vỉ than, cuộn lá kim và chấm sốt tương đậu.',
        calories: 1100,
        price: '199.000 - 279.000đ',
        wear: 'Factory New (Cực phẩm bàn ăn)'
      },
      {
        id: 'lau-haidilao',
        name: 'Lẩu Haidilao Tứ Xuyên Trưa',
        rarity: 'classified',
        emoji: '🫕',
        desc: 'Múa mì đỉnh cao, nước lẩu cà chua và lẩu cay tê lưỡi, làm đẹp móng miễn phí.',
        calories: 950,
        price: '250.000 - 350.000đ',
        wear: 'Factory New (Dịch vụ VIP 5 Sao)'
      },
      {
        id: 'com-me-nau',
        name: 'Cơm Mẹ Nấu Đầy Yêu Thương',
        rarity: 'covert',
        emoji: '❤️‍🔥',
        desc: 'Món ăn gia đình độc nhất vô nhị. 0đ chi phí, 100% tình cảm ấm lòng.',
        calories: 500,
        price: 'Vô giá ❤️',
        wear: 'Factory New (Đặc biệt quý giá)'
      },
      {
        id: 'sep-bao-an',
        name: '★ Sếp / Đồng Nghiệp Bao Ăn 100% ★',
        rarity: 'gold',
        emoji: '🏆',
        desc: 'Hôm nay bạn không phải rút ví một xu! Mọi chi phí đã có đại gia thanh toán.',
        calories: 0,
        price: '0 VNĐ (Người khác trả)',
        wear: '★ StatTrak™ Vàng May Mắn ★'
      }
    ]
  },
  {
    id: 'weekend-feast',
    name: 'Hòm Cuối Tuần Xõa Hết Mình',
    tagline: 'Phần thưởng xứng đáng sau một tuần cày cuốc',
    icon: '🎉',
    badge: 'Deluxe Case',
    bannerColor: 'from-purple-900/60 to-slate-950',
    items: [
      {
        id: 'nem-nuong-nha-trang',
        name: 'Nem Nướng Nha Trang Cuốn Bánh Tráng',
        rarity: 'consumer',
        emoji: '🌯',
        desc: 'Nước chấm tương đậu thịt xay sánh mịn, rau sống tươi mơn mởn.',
        calories: 520,
        price: '40.000 - 50.000đ',
        wear: 'Field-Tested'
      },
      {
        id: 'chan-ga-sa-tac',
        name: 'Chân Gà Rút Xương Sả Tắc Giòn Sần Sật',
        rarity: 'industrial',
        emoji: '🍗',
        desc: 'Vị chua ngọt cay tê, chấm muối ớt xanh thơm nức mũi nhâm nhi.',
        calories: 380,
        price: '60.000 - 80.000đ',
        wear: 'Minimal Wear'
      },
      {
        id: 'oc-huong-sot-trung-muoi',
        name: 'Ốc Hương Xào Sốt Trứng Muối',
        rarity: 'milspec',
        emoji: '🐚',
        desc: 'Sốt trứng muối béo bùi ngập tràn, kèm bánh mì đặc ruột quẹt vét đĩa.',
        calories: 680,
        price: '90.000 - 140.000đ',
        wear: 'Factory New'
      },
      {
        id: 'lau-manwah',
        name: 'Lẩu Đài Loan Manwah Buffet',
        rarity: 'restricted',
        emoji: '🍲',
        desc: 'Thịt bò Mỹ nhúng tái trong nước lẩu Mala thơm nồng thảo mộc, tráng miệng kem Haagen Dazs.',
        calories: 1200,
        price: '380.000 - 450.000đ',
        wear: 'Factory New'
      },
      {
        id: 'steak-wagyu',
        name: 'Bò Bít Tết Thăn Ngoại Wagyu A5',
        rarity: 'classified',
        emoji: '🥩',
        desc: 'Vân mỡ đan xen như cẩm thạch, mềm tan ngay trên đầu lưỡi kèm sốt tiêu đen.',
        calories: 890,
        price: '500.000 - 900.000đ',
        wear: 'Factory New'
      },
      {
        id: 'buffet-tom-hum',
        name: 'Buffet Hải Sản Tôm Hùm & Cua Hoàng Đế',
        rarity: 'covert',
        emoji: '🦞',
        desc: 'Hải sản tươi sống bắt tại bể, tôm hùm nướng phô mai béo ngậy không giới hạn.',
        calories: 1500,
        price: '1.200.000 - 1.800.000đ',
        wear: 'Factory New (Đẳng cấp hoàng gia)'
      },
      {
        id: 'crush-date',
        name: '★ Bữa Tối Lãng Mạn Cùng Crush / Người Yêu ★',
        rarity: 'gold',
        emoji: '✨',
        desc: 'Ăn gì không quan trọng, quan trọng là ngồi đối diện với người bạn thích nhất!',
        calories: 999,
        price: 'Vô giá (Ngọt ngào 100%)',
        wear: '★ StatTrak™ Tình Yêu Vĩnh Cửu ★'
      }
    ]
  },
  {
    id: 'milktea-snack',
    name: 'Hộp Tiếp Năng Lượng & Trà Sữa',
    tagline: 'Chữa lành tâm hồn bằng đường và phô mai',
    icon: '🧋',
    badge: 'Snack Capsule',
    bannerColor: 'from-amber-900/60 to-slate-950',
    items: [
      {
        id: 'banh-trang-tron',
        name: 'Bánh Tráng Trộn Long An Đầy Đủ',
        rarity: 'consumer',
        emoji: '🥢',
        desc: 'Khô bò, tép sấy, trứng cút, xoài băm, rau răm và hành phi thơm phức.',
        calories: 330,
        price: '20.000 - 25.000đ',
        wear: 'Field-Tested'
      },
      {
        id: 'tra-tac-khong-lo',
        name: 'Trà Tắc / Trà Đào Khổng Lồ 1 Lít',
        rarity: 'consumer',
        emoji: '🍹',
        desc: 'Cực đã khát giữa trưa hè nắng nóng oi bức 39 độ.',
        calories: 180,
        price: '15.000 - 20.000đ',
        wear: 'Factory New'
      },
      {
        id: 'tra-sua-truyen-thong',
        name: 'Trà Sữa Truyền Thống Trân Châu Đen',
        rarity: 'industrial',
        emoji: '🧋',
        desc: 'Trà đen đậm đà, sữa béo ngọt dịu, trân châu dẻo dai nhai mỏi răng.',
        calories: 450,
        price: '30.000 - 40.000đ',
        wear: 'Minimal Wear'
      },
      {
        id: 'ca-phe-muoi',
        name: 'Cà Phê Muối Kem Béo Huế',
        rarity: 'industrial',
        emoji: '☕',
        desc: 'Lớp màng kem mằn mặn béo ngậy kết hợp cà phê phin đắng đậm.',
        calories: 220,
        price: '25.000 - 35.000đ',
        wear: 'Factory New'
      },
      {
        id: 'croissant-trung-muoi',
        name: 'Bánh Croissant Bơ Tỏi Trứng Muối',
        rarity: 'milspec',
        emoji: '🥐',
        desc: 'Bánh ngàn lớp giòn rụm bên ngoài xốp mềm bên trong thơm lừng bơ Pháp.',
        calories: 410,
        price: '45.000 - 65.000đ',
        wear: 'Factory New'
      },
      {
        id: 'koi-the-macchiato',
        name: 'KOI Thé Lục Trà Macchiato 70% Đường',
        rarity: 'restricted',
        emoji: '🥤',
        desc: 'Húp một ngụm bọt kem dính mép ria mép trắng xóa chuẩn gu sành điệu.',
        calories: 380,
        price: '55.000 - 70.000đ',
        wear: 'Factory New'
      },
      {
        id: 'phuc-long-tra-dao',
        name: 'Phúc Long Trà Đào Cam Sả Topping Đầy Ụ',
        rarity: 'classified',
        emoji: '🍑',
        desc: 'Đậm vị trà nức tiếng, uống buổi chiều là thức trắng đêm suy nghĩ về tương lai.',
        calories: 320,
        price: '65.000 - 80.000đ',
        wear: 'Factory New'
      },
      {
        id: 'phe-la-o-long',
        name: 'Phê La - Ô Long Sữa Tươi Kem Trứng Khò',
        rarity: 'covert',
        emoji: '🍵',
        desc: 'Vị trà Ô Long Đắk Lắk trứ danh hòa quyện lớp kem trứng khò thơm nức mũi.',
        calories: 420,
        price: '68.000 - 85.000đ',
        wear: 'Factory New (Hương vị mê hoặc)'
      },
      {
        id: 'ban-mua-cho',
        name: '★ Trà Sữa Được Bạn Mua Tặng Bất Ngờ ★',
        rarity: 'gold',
        emoji: '🎁',
        desc: 'Cốc trà sữa ngọt ngào nhất thế gian là cốc trà sữa không tốn tiền mua!',
        calories: 500,
        price: '0 VNĐ (Tình bạn diệu kỳ)',
        wear: '★ StatTrak™ Vị Ngọt Tình Bạn ★'
      }
    ]
  },
  {
    id: 'midnight-hunger',
    name: 'Hòm Cứu Đói Lúc Nửa Đêm',
    tagline: 'Khi đồng hồ điểm 12h đêm và dạ dày bắt đầu sôi sùng sục',
    icon: '🌙',
    badge: 'Night Ops Case',
    bannerColor: 'from-indigo-950 to-slate-950',
    items: [
      {
        id: 'banh-mi-cham-sua',
        name: 'Bánh Mì Chấm Sữa Đặc Ông Thọ',
        rarity: 'consumer',
        emoji: '🥖',
        desc: 'Món ăn tuổi thơ giản dị, cứu đói cấp tốc trong 30 giây.',
        calories: 380,
        price: '10.000 - 15.000đ',
        wear: 'Well-Worn'
      },
      {
        id: 'trung-vit-lon',
        name: 'Trứng Vịt Lộn Ngải Cứu Nóng Hổi',
        rarity: 'industrial',
        emoji: '🥚',
        desc: 'Ăn kèm rau răm và gừng thái sợi, ấm bụng đêm sương lạnh.',
        calories: 360,
        price: '15.000 - 25.000đ',
        wear: 'Field-Tested'
      },
      {
        id: 'xoi-dem',
        name: 'Xôi Đêm Thịt Kho Trứng Ruốc',
        rarity: 'milspec',
        emoji: '🍚',
        desc: 'Hạt nếp dẻo thơm rưới thìa nước thịt kho tàu béo ngậy.',
        calories: 620,
        price: '30.000 - 45.000đ',
        wear: 'Minimal Wear'
      },
      {
        id: 'chan-ga-nuong-dem',
        name: 'Chân Cánh Gà Nướng Mật Ong Đêm Muộn',
        rarity: 'restricted',
        emoji: '🍗',
        desc: 'Mùi khói than hoa thoang thoảng góc phố khuya, cay nồng ớt quất.',
        calories: 550,
        price: '70.000 - 100.000đ',
        wear: 'Factory New'
      },
      {
        id: 'pho-ganh-dem',
        name: 'Tô Phở Gánh Phố Cổ Lúc 3 Giờ Sáng',
        rarity: 'covert',
        emoji: '🍜',
        desc: 'Nét ẩm thực huyền thoại, bát phở bốc khói nghi ngút giữa đêm tĩnh lặng.',
        calories: 600,
        price: '50.000 - 65.000đ',
        wear: 'Factory New (Huyền thoại đêm khuya)'
      },
      {
        id: 'di-ngu-giam-can',
        name: '★ Tắt Đèn Đi Ngủ Sớm Giảm Cân! ★',
        rarity: 'gold',
        emoji: '😴',
        desc: 'Chiến thắng cám dỗ đêm khuya! Uống cốc nước lọc rồi đi ngủ giữ dáng và giữ sức khỏe.',
        calories: 0,
        price: '0 VNĐ (Kỷ luật thép)',
        wear: '★ StatTrak™ Ý Chí Thép ★'
      }
    ]
  }
]
