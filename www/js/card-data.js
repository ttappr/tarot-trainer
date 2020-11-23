const CARD_DATA = [
    {
        suit    : "Wands",
        value   : "King",
        pic     : "pictorial-key-to-the-tarot.026.jpg",
        descr   : "The physical and emotional nature to which this card is attributed is dark, ardent, lithe, animated, impassioned, noble. The King uplifts a flowering wand, and wears, like his three correspondences in the remaining suits, what is called a cap of maintenance beneath his crown. He connects with the symbol of the lion, which is emblazoned on the back of his throne. ",
        meaning : "Dark man, friendly, countryman, generally married, honest and conscientious. The card always signifies honesty, and may mean news concerning an unexpected heritage to fall in before very long.",
        reverse : "Good, but severe; austere, yet tolerant."
    },
    {
        suit    : "Wands",
        value   : "Queen",
        pic     : "pictorial-key-to-the-tarot.027.jpg",
        descr   : "The Wands throughout this suit are always in leaf, as it is a suit of life and animation. Emotionally and otherwise, the Queen's personality corresponds to that of the King, but is more magnetic. ",
        meaning : "A dark woman, countrywoman, friendly, chaste, loving, honourable. If the card beside her signifies a man, she is well disposed towards him; if a woman, she is interested in the Querent. Also, love of money, or a certain success in business.",
        reverse : "Good, economical, obliging, serviceable. Signifies also--but in certain positions and in the neighbourhood of other cards tending in such directions--opposition, jealousy, even deceit and infidelity."
    },
    {
        suit    : "Wands",
        value   : "Knight",
        pic     : "pictorial-key-to-the-tarot.028.jpg",
        descr   : "He is shewn as if upon a journey, armed with a short wand, and although mailed is not on a warlike errand. He is passing mounds or pyramids. The motion of the horse is a key to the character of its rider, and suggests the precipitate mood, or things connected therewith.",
        meaning : "Departure, absence, flight, emigration. A dark young man, friendly. Change of residence.",
        reverse : "Rupture, division, interruption, discord."
    },
    {
        suit    : "Wands",
        value   : "Page",
        pic     : "pictorial-key-to-the-tarot.029.jpg",
        descr   : "In a scene similar to the former, a young man stands in the act of proclamation. He is unknown but faithful, and his tidings are strange.",
        meaning : "Dark young man, faithful, a lover, an envoy, a postman. Beside a man, he will bear favourable testimony concerning him. A dangerous rival, if followed by the Page of Cups. Has the chief qualities of his suit. ",
        reverse : "None"
    },
    {
        suit    : "Wands",
        value   : "Ten",
        pic     : "pictorial-key-to-the-tarot.030.jpg",
        descr   : "A man oppressed by the weight of the ten staves which he is carrying.",
        meaning : "A card of many significances, and some of the readings cannot be harmonized. I set aside that which connects it with honour and good faith. The chief meaning is oppression simply, but it is also fortune, gain, any kind of success, and then it is the oppression of these things. It is also a card of false-seeming, disguise, perfidy. The place which the figure is approaching may suffer from the rods that he carries. Success is stultified if the Nine of Swords follows, and if it is a question of a lawsuit, there will be certain loss.",
        reverse : "Contrarieties, difficulties, intrigues, and their analogies."
    },
    {
        suit    : "Wands",
        value   : "Nine",
        pic     : "pictorial-key-to-the-tarot.031.jpg",
        descr   : "The figure leans upon his staff and has an expectant look, as if awaiting an enemy. Behind are eight other staves--erect, in orderly disposition, like a palisade.",
        meaning : "The card signifies strength in opposition. If attacked, the person will meet an onslaught boldly; and his build shews, that he may prove a formidable antagonist. With this main significance there are all its possible adjuncts--delay, suspension, adjournment.",
        reverse : "Obstacles, adversity, calamity."
    },
    {
        suit    : "Wands",
        value   : "Eight",
        pic     : "pictorial-key-to-the-tarot.032.jpg",
        descr   : "The card represents motion through the immovable-a flight of wands through an open country; but they draw to the term of their course. That which they signify is at hand; it may be even on the threshold.",
        meaning : "Activity in undertakings, the path of such activity, swiftness, as that of an express messenger; great haste, great hope, speed towards an end which promises assured felicity; generally, that which is on the move; also the arrows of love.",
        reverse : "Arrows of jealousy, internal dispute, stingings of conscience, quarrels; and domestic disputes for persons who are married."
    },
    {
        suit    : "Wands",
        value   : "Seven",
        pic     : "pictorial-key-to-the-tarot.033.jpg",
        descr   : "A young man on a craggy eminence brandishing a staff; six other staves are raised towards him from below.",
        meaning : "It is a card of valour, for, on the surface, six are attacking one, who has, however, the vantage position. On the intellectual plane, it signifies discussion, wordy strife; in business--negotiations, war of trade, barter, competition. It is further a card of success, for the combatant is on the top and his enemies may be unable to reach him.",
        reverse : "Perplexity, embarrassments, anxiety. It is also a caution against indecision."
    },
    {
        suit    : "Wands",
        value   : "Six",
        pic     : "pictorial-key-to-the-tarot.034.jpg",
        descr   : "A laurelled horseman bears one staff adorned with a laurel crown; footmen with staves are at his side.",
        meaning : "The card has been so designed that it can cover several significations; on the surface, it is a victor triumphing, but it is also great news, such as might be carried in state by the King's courier; it is expectation crowned with its own desire, the crown of hope, and so forth.",
        reverse : "Apprehension, fear, as of a victorious enemy at the gate; treachery, disloyalty, as of gates being opened to the enemy; also indefinite delay."
    },
    {
        suit    : "Wands",
        value   : "Five",
        pic     : "pictorial-key-to-the-tarot.035.jpg",
        descr   : "A posse of youths, who are brandishing staves, as if in sport or strife. It is mimic warfare, and hereto correspond the",
        meaning : "Imitation, as, for example, sham fight, but also the strenuous competition and struggle of the search after riches and fortune. In this sense it connects with the battle of life. Hence some attributions say that it is a card of gold, gain, opulence. ",
        reverse : "Litigation, disputes, trickery, contradiction."
    },
    {
        suit    : "Wands",
        value   : "Four",
        pic     : "pictorial-key-to-the-tarot.036.jpg",
        descr   : "From the four great staves planted in the foreground there is a great garland suspended; two female figures uplift nosegays; at their side is a bridge over a moat, leading to an old manorial house.",
        meaning : "They are for once almost on the surface--country life, haven of refuge, a species of domestic harvest-home, repose, concord, harmony, prosperity, peace, and the perfected work of these.",
        reverse : "The meaning remains unaltered; it is prosperity, increase, felicity, beauty, embellishment."
    },
    {
        suit    : "Wands",
        value   : "Three",
        pic     : "pictorial-key-to-the-tarot.037.jpg",
        descr   : "A calm, stately personage, with his back turned, looking from a cliff's edge at ships passing over the sea. Three staves are planted in the ground, and he leans slightly on one of them. ",
        meaning : "He symbolizes established strength, enterprise, effort, trade, commerce, discovery; those are his ships, bearing his merchandise, which are sailing over the sea. The card also signifies able co-operation in business, as if the successful merchant prince were looking from his side towards yours with a view to help you.",
        reverse : "The end of troubles, suspension or cessation of adversity, toil and disappointment."
    },
    {
        suit    : "Wands",
        value   : "Two",
        pic     : "pictorial-key-to-the-tarot.038.jpg",
        descr   : "A tall man looks from a battlemented roof over sea and shore; he holds a globe in his right hand, while a staff in his left rests on the battlement; another is fixed in a ring. The Rose and Cross and Lily should be noticed on the left side.",
        meaning : "Between the alternative readings there is no marriage possible; on the one hand, riches, fortune, magnificence; on the other, physical suffering, disease, chagrin, sadness, mortification. The design gives one suggestion; here is a lord overlooking his dominion and alternately contemplating a globe; it looks like the malady, the mortification, the sadness of Alexander amidst the grandeur of this world's wealth.",
        reverse : "Surprise, wonder, enchantment, emotion, trouble, fear."
    },
    {
        suit    : "Wands",
        value   : "Ace",
        pic     : "pictorial-key-to-the-tarot.039.jpg",
        descr   : "A hand issuing from a cloud grasps a stout wand or club.",
        meaning : "Creation, invention, enterprise, the powers which result in these; principle, beginning, source; birth, family, origin, and in a sense the virility which is behind them; the starting point of enterprises; according to another account, money, fortune, inheritance.",
        reverse : "Fall, decadence, ruin, perdition, to perish also a certain clouded joy."
    },
    {
        suit    : "Cups",
        value   : "King",
        pic     : "pictorial-key-to-the-tarot.040.jpg",
        descr   : "He holds a short sceptre in his left hand and a great cup in his right; his throne is set upon the sea; on one side a ship is riding and on the other a dolphin is leaping. The implicit is that the Sign of the Cup naturally refers to water, which appears in all the court cards.",
        meaning : "Fair man, man of business, law, or divinity; responsible, disposed to oblige the Querent; also equity, art and science, including those who profess science, law and art; creative intelligence.",
        reverse : "Dishonest, double-dealing man; roguery, exaction, injustice, vice, scandal, pillage, considerable loss."
    },
    {
        suit    : "Cups",
        value   : "Queen",
        pic     : "pictorial-key-to-the-tarot.041.jpg",
        descr   : "Beautiful, fair, dreamy--as one who sees visions in a cup. This is, however, only one of her aspects; she sees, but she also acts, and her activity feeds her dream.",
        meaning : "Good, fair woman; honest, devoted woman, who will do service to the Querent; loving intelligence, and hence the gift of vision; success, happiness, pleasure; also wisdom, virtue; a perfect spouse and a good mother.",
        reverse : "The accounts vary; good woman; otherwise, distinguished woman but one not to be trusted; perverse woman; vice, dishonour, depravity."
    },
    {
        suit    : "Cups",
        value   : "Knight",
        pic     : "pictorial-key-to-the-tarot.042.jpg",
        descr   : "Graceful, but not warlike; riding quietly, wearing a winged helmet, referring to those higher graces of the imagination which sometimes characterize this card. He too is a dreamer, but the images of the side of sense haunt him in his vision.",
        meaning : "Arrival, approach--sometimes that of a messenger; advances, proposition, demeanour, invitation, incitement. ",
        reverse : "Trickery, artifice, subtlety, swindling, duplicity, fraud."
    },
    {
        suit    : "Cups",
        value   : "Page",
        pic     : "pictorial-key-to-the-tarot.043.jpg",
        descr   : "A fair, pleasing, somewhat effeminate page, of studious and intent aspect, contemplates a fish rising from a cup to look at him. It is the pictures of the mind taking form.",
        meaning : "Fair young man, one impelled to render service and with whom the Querent will be connected; a studious youth; news, message; application, reflection, meditation; also these things directed to business.",
        reverse : "Taste, inclination, attachment, seduction, deception, artifice."
    },
    {
        suit    : "Cups",
        value   : "Ten",
        pic     : "pictorial-key-to-the-tarot.044.jpg",
        descr   : "Appearance of Cups in a rainbow; it is contemplated in wonder and ecstacy by a man and woman below, evidently husband and wife. His right arm is about her; his left is raised upward; she raises her right arm. The two children dancing near them have not observed the prodigy but are happy after their own manner. There is a home-scene beyond.",
        meaning : "Contentment, repose of the entire heart; the perfection of that state; also perfection of human love and friendship; if with several picture-cards, a person who is taking charge of the Querent's interests; also the town, village or country inhabited by the Querent.",
        reverse : "Repose of the false heart, indignation, violence."
    },
    {
        suit    : "Cups",
        value   : "Nine",
        pic     : "pictorial-key-to-the-tarot.045.jpg",
        descr   : "A goodly personage has feasted to his heart's content, and abundant refreshment of wine is on the arched counter behind him, seeming to indicate that the future is also assured. The picture offers the material side only, but there are other aspects.",
        meaning : "Concord, contentment, physical<em>bien-être</em>; also victory, success, advantage; satisfaction for the Querent or person for whom the consultation is made.",
        reverse : "Truth, loyalty, liberty; but the readings vary and include mistakes, imperfections, etc."
    },
    {
        suit    : "Cups",
        value   : "Eight",
        pic     : "pictorial-key-to-the-tarot.046.jpg",
        descr   : "A man of dejected aspect is deserting the cups of his felicity, enterprise, undertaking or previous concern.",
        meaning : "The card speaks for itself on the surface, but other readings are entirely antithetical--giving joy, mildness, timidity, honour, modesty. In practice, it is usually found that the card shews the decline of a matter, or that a matter which has been thought to be important is really of slight consequence--either for good or evil.",
        reverse : "Great joy, happiness, feasting."
    },
    {
        suit    : "Cups",
        value   : "Seven",
        pic     : "pictorial-key-to-the-tarot.047.jpg",
        descr   : "Strange chalices of vision, but the images are more especially those of the fantastic spirit.",
        meaning : "Fairy favours, images of reflection, sentiment, imagination, things seen in the glass of contemplation; some attainment in these degrees, but nothing permanent or substantial is suggested.",
        reverse : "Desire, will, determination, project."
    },
    {
        suit    : "Cups",
        value   : "Six",
        pic     : "pictorial-key-to-the-tarot.048.jpg",
        descr   : "Children in an old garden, their cups filled with flowers.",
        meaning : "A card of the past and of memories, looking back, as--for example--on childhood; happiness, enjoyment, but coming rather from the past; things that have vanished. Another reading reverses this, giving new relations, new knowledge, new environment, and then the children are disporting in an unfamiliar precinct.",
        reverse : "The future, renewal, that which will come to pass presently."
    },
    {
        suit    : "Cups",
        value   : "Five",
        pic     : "pictorial-key-to-the-tarot.049.jpg",
        descr   : "A dark, cloaked figure, looking sideways at three prone cups two others stand upright behind him; a bridge is in the background, leading to a small keep or holding.",
        meaning : "It is a card of loss, but something remains over; three have been taken, but two are left; it is a card of inheritance, patrimony, transmission, but not corresponding to expectations; with some interpreters it is a card of marriage, but not without bitterness or frustration.",
        reverse : "News, alliances, affinity, consanguinity, ancestry, return, false projects."
    },
    {
        suit    : "Cups",
        value   : "Four",
        pic     : "pictorial-key-to-the-tarot.050.jpg",
        descr   : "A young man is seated under a tree and contemplates three cups set on the grass before him; an arm issuing from a cloud offers him another cup. His expression notwithstanding is one of discontent with his environment.",
        meaning : "Weariness, disgust, aversion, imaginary vexations, as if the wine of this world had caused satiety only; another wine, as if a fairy gift, is now offered the wastrel, but he sees no consolation therein. This is also a card of blended pleasure.",
        reverse : "Novelty, presage, new instruction, new relations."
    },
    {
        suit    : "Cups",
        value   : "Three",
        pic     : "pictorial-key-to-the-tarot.051.jpg",
        descr   : "Maidens in a garden-ground with cups uplifted, as if pledging one another.",
        meaning : "The conclusion of any matter in plenty, perfection and merriment; happy issue, victory, fulfilment, solace, healing,",
        reverse : "Expedition, dispatch, achievement, end. It signifies also the side of excess in physical enjoyment, and the pleasures of the senses."
    },
    {
        suit    : "Cups",
        value   : "Two",
        pic     : "pictorial-key-to-the-tarot.052.jpg",
        descr   : "A youth and maiden are pledging one another, and above their cups rises the Caduceus of Hermes, between the great wings of which there appears a lion's head. It is a variant of a sign which is found in a few old examples of this card. Some curious emblematical meanings are attached to it, but they do not concern us in this place.",
        meaning : "Love, passion, friendship, affinity, union, concord, sympathy, the interrelation of the sexes, and--as a suggestion apart from all offices of divination--that desire which is not in Nature, but by which Nature is sanctified.",
        reverse : "None"
    },
    {
        suit    : "Cups",
        value   : "Ace",
        pic     : "pictorial-key-to-the-tarot.053.jpg",
        descr   : "The waters are beneath, and thereon are water-lilies; the hand issues from the cloud, holding in its palm the cup, from which four streams are pouring; a dove, bearing in its bill a cross-marked Host, descends to place the Wafer in the Cup; the dew of water is falling on all sides. It is an intimation of that which may lie behind the Lesser Arcana.",
        meaning : "House of the true heart, joy, content, abode, nourishment, abundance, fertility; Holy Table, felicity hereof.",
        reverse : "House of the false heart, mutation, instability, revolution."
    },
    {
        suit    : "Swords",
        value   : "King",
        pic     : "pictorial-key-to-the-tarot.054.jpg",
        descr   : "He sits in judgment, holding the unsheathed sign of his suit. He recalls, of course, the conventional Symbol of justice in the Trumps Major, and he may represent this virtue, but he is rather the power of life and death, in virtue of his office.",
        meaning : "Whatsoever arises out of the idea of judgment and all its connexions-power, command, authority, militant intelligence, law, offices of the crown, and so forth.",
        reverse : "Cruelty, perversity, barbarity, perfidy, evil intention."
    },
    {
        suit    : "Swords",
        value   : "Queen",
        pic     : "pictorial-key-to-the-tarot.055.jpg",
        descr   : "Her right hand raises the weapon vertically and the hilt rests on an arm of her royal chair the left hand is extended, the arm raised her countenance is severe but chastened; it suggests familiarity with sorrow. It does not represent mercy, and, her sword notwithstanding, she is scarcely a symbol of power.",
        meaning : "Widowhood, female sadness and embarrassment, absence, sterility, mourning, privation, separation.",
        reverse : "Malice, bigotry, artifice, prudery, bale, deceit."
    },
    {
        suit    : "Swords",
        value   : "Knight",
        pic     : "pictorial-key-to-the-tarot.056.jpg",
        descr   : "He is riding in full course, as if scattering his enemies. In the design he is really a prototypical hero of romantic chivalry. He might almost be Galahad, whose sword is swift and sure because he is clean of heart.",
        meaning : "Skill, bravery, capacity, defence, address, enmity, wrath, war, destruction, opposition, resistance, ruin. There is therefore a sense in which the card signifies death, but it carries this meaning only in its proximity to other cards of fatality.",
        reverse : "Imprudence, incapacity, extravagance."
    },
    {
        suit    : "Swords",
        value   : "Page",
        pic     : "pictorial-key-to-the-tarot.057.jpg",
        descr   : "A lithe, active figure holds a sword upright in both hands, while in the act of swift walking. He is passing over rugged land, and about his way the clouds are collocated wildly. He is alert and lithe, looking this way and that, as if an expected enemy might appear at any moment.",
        meaning : "Authority, overseeing, secret service, vigilance, spying, examination, and the qualities thereto belonging.",
        reverse : "More evil side of these qualities; what is unforeseen, unprepared state; sickness is also intimated."
    },
    {
        suit    : "Swords",
        value   : "Ten",
        pic     : "pictorial-key-to-the-tarot.058.jpg",
        descr   : "A prostrate figure, pierced by all the swords belonging to the card.",
        meaning : "Whatsoever is intimated by the design; also pain, affliction, tears, sadness, desolation. It is not especially a card of violent death.",
        reverse : "Advantage, profit, success, favour, but none of these are permanent; also power and authority."
    },
    {
        suit    : "Swords",
        value   : "Nine",
        pic     : "pictorial-key-to-the-tarot.059.jpg",
        descr   : "One seated on her couch in lamentation, with the swords over her. She is as one who knows no sorrow which is like unto hers. It is a card of utter desolation.",
        meaning : "Death, failure, miscarriage, delay, deception, disappointment, despair.",
        reverse : "Imprisonment, suspicion, doubt, reasonable fear, shame."
    },
    {
        suit    : "Swords",
        value   : "Eight",
        pic     : "pictorial-key-to-the-tarot.060.jpg",
        descr   : "A woman, bound and hoodwinked, with the swords of the card about her. Yet it is rather a card of temporary durance than of irretrievable bondage.",
        meaning : "Bad news, violent chagrin, crisis, censure, power in trammels, conflict, calumny; also sickness.",
        reverse : "Disquiet, difficulty, opposition, accident, treachery; what is unforeseen; fatality."
    },
    {
        suit    : "Swords",
        value   : "Seven",
        pic     : "pictorial-key-to-the-tarot.061.jpg",
        descr   : "A man in the act of carrying away five swords rapidly; the two others of the card remain stuck in the ground. A camp is close at hand.",
        meaning : "Design, attempt, wish, hope, confidence; also quarrelling, a plan that may fail, annoyance. The design is uncertain in its import, because the significations are widely at variance with each other.",
        reverse : "Good advice, counsel, instruction, slander, babbling."
    },
    {
        suit    : "Swords",
        value   : "Six",
        pic     : "pictorial-key-to-the-tarot.062.jpg",
        descr   : "A ferryman carrying passengers in his punt to the further shore. The course is smooth, and seeing that the freight is light, it may be noted that the work is not beyond his strength.",
        meaning : "journey by water, route, way, envoy, commissionary, expedient.",
        reverse : "Declaration, confession, publicity; one account says that it is a proposal of love."
    },
    {
        suit    : "Swords",
        value   : "Five",
        pic     : "pictorial-key-to-the-tarot.063.jpg",
        descr   : "A disdainful man looks after two retreating and dejected figures. Their swords lie upon the ground. He carries two others on his left shoulder, and a third sword is in his right hand, point to earth. He is the master in possession of the field.",
        meaning : "Degradation, destruction, revocation, infamy, dishonour, loss, with the variants and analogues of these.",
        reverse : "The same; burial and obsequies."
    },
    {
        suit    : "Swords",
        value   : "Four",
        pic     : "pictorial-key-to-the-tarot.064.jpg",
        descr   : "The effigy of a knight in the attitude of prayer, at full length upon his tomb.",
        meaning : "Vigilance, retreat, solitude, hermit's repose, exile, tomb and coffin. It is these last that have suggested the design.",
        reverse : "Wise administration, circumspection, economy, avarice, precaution, testament."
    },
    {
        suit    : "Swords",
        value   : "Three",
        pic     : "pictorial-key-to-the-tarot.065.jpg",
        descr   : "Three swords piercing a heart; cloud and rain behind.",
        meaning : "Removal, absence, delay, division, rupture, dispersion, and all that the design signifies naturally, being too simple and obvious to call for specific enumeration.",
        reverse : "Mental alienation, error, loss, distraction, disorder, confusion."
    },
    {
        suit    : "Swords",
        value   : "Two",
        pic     : "pictorial-key-to-the-tarot.066.jpg",
        descr   : "A hoodwinked female figure balances two swords upon her shoulders.",
        meaning : "Conformity and the equipoise which it suggests, courage, friendship, concord in a state of arms; another reading gives tenderness, affection, intimacy. The suggestion of harmony and other favourable readings must be considered in a qualified manner, as Swords generally are not symbolical of beneficent forces in human affairs.",
        reverse : "Imposture, falsehood, duplicity, disloyalty."
    },
    {
        suit    : "Swords",
        value   : "Ace",
        pic     : "pictorial-key-to-the-tarot.067.jpg",
        descr   : "A hand issues from a cloud, grasping a sword, the point of which is encircled by a crown.",
        meaning : "Triumph, the excessive degree in everything, conquest, triumph of force. It is a card of great force, in love as well as in hatred. The crown may carry a much higher significance than comes usually within the sphere of fortune-telling.",
        reverse : "The same, but the results are disastrous; another account says--conception, childbirth, augmentation, multiplicity."
    },
    {
        suit    : "Pentacles",
        value   : "King",
        pic     : "pictorial-key-to-the-tarot.068.jpg",
        descr   : "The figure calls for no special description the face is rather dark, suggesting also courage, but somewhat lethargic in tendency. The bull's head should be noted as a recurrent symbol on the throne. The sign of this suit is represented throughout as engraved or blazoned with the pentagram, typifying the correspondence of the four elements in human nature and that by which they may be governed. In many old Tarot packs this suit stood for current coin, money, deniers. I have not invented the substitution of pentacles and I have no special cause to sustain in respect of the alternative. But the consensus of divinatory meanings is on the side of some change, because the cards do not happen to deal especially with questions of money.",
        meaning : "Valour, realizing intelligence, business and normal intellectual aptitude, sometimes mathematical gifts and attainments of this kind; success in these paths.",
        reverse : "Vice, weakness, ugliness, perversity, corruption, peril."
    },
    {
        suit    : "Pentacles",
        value   : "Queen",
        pic     : "pictorial-key-to-the-tarot.069.jpg",
        descr   : "The face suggests that of a dark woman, whose qualities might be summed up in the idea of greatness of soul; she has also the serious cast of intelligence; she contemplates her symbol and may see worlds therein.",
        meaning : "Opulence, generosity, magnificence, security, liberty.",
        reverse : "Evil, suspicion, suspense, fear, mistrust."
    },
    {
        suit    : "Pentacles",
        value   : "Knight",
        pic     : "pictorial-key-to-the-tarot.070.jpg",
        descr   : "He rides a slow, enduring, heavy horse, to which his own aspect corresponds. He exhibits his symbol, but does not look therein.",
        meaning : "Utility, serviceableness, interest, responsibility, rectitude-all on the normal and external plane.",
        reverse : "inertia, idleness, repose of that kind, stagnation; also placidity, discouragement, carelessness."
    },
    {
        suit    : "Pentacles",
        value   : "Page",
        pic     : "pictorial-key-to-the-tarot.071.jpg",
        descr   : "A youthful figure, looking intently at the pentacle which hovers over his raised hands. He moves slowly, insensible of that which is about him.",
        meaning : "Application, study, scholarship, reflection another reading says news, messages and the bringer thereof; also rule, management.",
        reverse : "Prodigality, dissipation, liberality, luxury; unfavourable news."
    },
    {
        suit    : "Pentacles",
        value   : "Ten",
        pic     : "pictorial-key-to-the-tarot.072.jpg",
        descr   : "A man and woman beneath an archway which gives entrance to a house and domain. They are accompanied by a child, who looks curiously at two dogs accosting an ancient personage seated in the foreground. The child's hand is on one of them.",
        meaning : "Gain, riches; family matters, archives, extraction, the abode of a family.",
        reverse : "Chance, fatality, loss, robbery, games of hazard; sometimes gift, dowry, pension."
    },
    {
        suit    : "Pentacles",
        value   : "Nine",
        pic     : "pictorial-key-to-the-tarot.073.jpg",
        descr   : "A woman, with a bird upon her wrist, stands amidst a great abundance of grapevines in the garden of a manorial house. It is a wide domain, suggesting plenty in all things. Possibly it is her own possession and testifies to material well-being.",
        meaning : "Prudence, safety, success, accomplishment, certitude, discernment.",
        reverse : "Roguery, deception, voided project, bad faith."
    },
    {
        suit    : "Pentacles",
        value   : "Eight",
        pic     : "pictorial-key-to-the-tarot.074.jpg",
        descr   : "An artist in stone at his work, which he exhibits in the form of trophies.",
        meaning : "Work, employment, commission, craftsmanship, skill in craft and business, perhaps in the preparatory stage.",
        reverse : "Voided ambition, vanity, cupidity, exaction, usury. It may also signify the possession of skill, in the sense of the ingenious mind turned to cunning and intrigue."
    },
    {
        suit    : "Pentacles",
        value   : "Seven",
        pic     : "pictorial-key-to-the-tarot.075.jpg",
        descr   : "A young man, leaning on his staff, looks intently at seven pentacles attached to a clump of greenery on his right; one would say that these were his treasures and that his heart was there. ",
        meaning : "These are exceedingly contradictory; in the main, it is a card of money, business, barter; but one reading gives altercation, quarrels--and another innocence, ingenuity, purgation.",
        reverse : "Cause for anxiety regarding money which it may be proposed to lend."
    },
    {
        suit    : "Pentacles",
        value   : "Six",
        pic     : "pictorial-key-to-the-tarot.076.jpg",
        descr   : "A person in the guise of a merchant weighs money in a pair of scales and distributes it to the needy and distressed. It is a testimony to his own success in life, as well as to his goodness of heart.",
        meaning : "Presents, gifts, gratification another account says attention, vigilance now is the accepted time, present prosperity, etc.",
        reverse : "Desire, cupidity, envy, jealousy, illusion."
    },
    {
        suit    : "Pentacles",
        value   : "Five",
        pic     : "pictorial-key-to-the-tarot.077.jpg",
        descr   : "Two mendicants in a snow-storm pass a lighted casement.",
        meaning : "The card foretells material trouble above all, whether in the form illustrated--that is, destitution--or otherwise. For some cartomancists, it is a card of love and lovers-wife, husband, friend, mistress; also concordance, affinities. These alternatives cannot be harmonized.",
        reverse : "Disorder, chaos, ruin, discord, profligacy."
    },
    {
        suit    : "Pentacles",
        value   : "Four",
        pic     : "pictorial-key-to-the-tarot.078.jpg",
        descr   : "A crowned figure, having a pentacle over his crown, clasps another with hands and arms; two pentacles are under his feet. He holds to that which he has.",
        meaning : "The surety of possessions, cleaving to that which one has, gift, legacy, inheritance.",
        reverse : "Suspense, delay, opposition."
    },
    {
        suit    : "Pentacles",
        value   : "Three",
        pic     : "pictorial-key-to-the-tarot.079.jpg",
        descr   : "A sculptor at his work in a monastery. Compare the design which illustrates the Eight of Pentacles. The apprentice or amateur therein has received his reward and is now at work in earnest. ",
        meaning : "<em>Métier</em>, trade, skilled labour; usually, however, regarded as a card of nobility, aristocracy, renown, glory.",
        reverse : "Mediocrity, in work and otherwise, puerility, pettiness, weakness."
    },
    {
        suit    : "Pentacles",
        value   : "Two",
        pic     : "pictorial-key-to-the-tarot.080.jpg",
        descr   : "A young man, in the act of dancing, has a pentacle in either hand, and they are joined by that endless cord which is like the number 8 reversed.",
        meaning : "On the one hand it is represented as a card of gaiety, recreation and its connexions, which is the subject of the design; but it is read also as news and messages in writing, as obstacles, agitation, trouble, embroilment.",
        reverse : "Enforced gaiety, simulated enjoyment, literal sense, handwriting, composition, letters of exchange."
    },
    {
        suit    : "Pentacles",
        value   : "Ace",
        pic     : "pictorial-key-to-the-tarot.081.jpg",
        descr   : "A hand--issuing, as usual, from a cloud--holds up a pentacle.",
        meaning : "Perfect contentment, felicity, ecstasy; also speedy intelligence; gold.",
        reverse : "The evil side of wealth, bad intelligence; also great riches. In any case it shews prosperity, comfortable material conditions, but whether these are of advantage to the possessor will depend on whether the card is reversed or not."
    },
]