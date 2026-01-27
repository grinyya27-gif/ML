        // --- CONSTANTS ---
        const TOOLS_DB = {
            rod: { id: 'rod', name: 'Удочка', baseCost: 50, icon: 'icon-rod', job: 'port' },
            sickle: { id: 'sickle', name: 'Серп', baseCost: 500, icon: 'icon-sickle', job: 'field' },
            pickaxe: { id: 'pickaxe', name: 'Кирка', baseCost: 2000, icon: 'icon-pickaxe', job: 'mine' },
            crossbow: { id: 'crossbow', name: 'Арбалет', baseCost: 5000, icon: 'fa-crosshairs', job: 'hunter' },
            sword: { id: 'sword', name: 'Меч', baseCost: 1000, icon: 'fa-khanda', job: 'guard' }
        };

        const SWORDS_DB = {
            wooden: { id: 'wooden', name: 'Деревянный меч', cost: 5000, costType: 'gold', damage: 5, icon: 'fa-splotch' },
            stone: { id: 'stone', name: 'Каменный меч', cost: 15000, costType: 'gold', damage: 15, icon: 'fa-monument' },
            metal: { id: 'metal', name: 'Металлический меч', cost: 200, costType: 'emeralds', damage: 25, icon: 'fa-khanda' },
            steel: { id: 'steel', name: 'Стальной меч', cost: 500, costType: 'emeralds', damage: 40, icon: 'fa-sword' },
            silver: { id: 'silver', name: 'Серебряный меч мастера', cost: 1500, costType: 'emeralds', damage: 60, icon: 'fa-wand-magic-sparkles' }
        };

        const ARMOR_DB = {
            leather: { id: 'leather', name: 'Кожаная броня', cost: 10000, costType: 'gold', armor: 5, icon: 'fa-vest' },
            improved: { id: 'improved', name: 'Улучшенная кожаная броня', cost: 30000, costType: 'gold', armor: 15, icon: 'fa-vest-patches' },
            chainmail: { id: 'chainmail', name: 'Кольчужная броня', cost: 200, costType: 'emeralds', armor: 25, icon: 'fa-user-shield' },
            iron: { id: 'iron', name: 'Железная броня', cost: 600, costType: 'emeralds', armor: 40, icon: 'fa-shield' },
            silver_master: { id: 'silver_master', name: 'Серебряная броня мастера', cost: 1200, costType: 'emeralds', armor: 60, icon: 'fa-shield-halved' }
        };

        const JOBS_DB = {
            port: { name: 'Порт', resource: 'fish', price: 5, xp: 1, tool: 'rod', injuryChance: 0.04 },
            loader: { name: 'Грузчик', resource: 'gold', price: 6, xp: 2, tool: null, levelReq: 3, injuryChance: 0.04, requiresAlex: true },
            field: { name: 'Поле', resource: 'wheat', price: 15, xp: 3, tool: 'sickle', levelReq: 5 },
            mine: { name: 'Рудник', resource: 'ore', price: 40, xp: 8, tool: 'pickaxe', levelReq: 15 },
            hunter: { name: 'Охота', resource: 'leather', price: 100, xp: 15, tool: 'crossbow', levelReq: 30 }
        };
        
        const RESOURCE_NAMES = {
            fish: { name: 'Рыба', icon: 'fa-fish' },
            meat: { name: 'Мясо', icon: 'fa-drumstick-bite' },
            mushrooms: { name: 'Грибы', icon: 'fa-umbrella' },
            bread: { name: 'Хлеб', icon: 'fa-bread-slice' },
            eggs: { name: 'Яйца', icon: 'fa-egg' },
            milk: { name: 'Молоко', icon: 'fa-mug-hot' },

            ore: { name: 'Руда', icon: 'fa-cube' },
            bronze: { name: 'Бронза', icon: 'fa-coins' },
            silver: { name: 'Серебро', icon: 'fa-ring' },

            wheat: { name: 'Пшеница', icon: 'fa-wheat-awn' },
            wood: { name: 'Палка', icon: 'fa-tree' },
            stone: { name: 'Камень', icon: 'fa-shapes' },
            herbs: { name: 'Травы', icon: 'fa-leaf' },
            leather: { name: 'Кожа', icon: 'icon-leather' },

            wool: { name: 'Шерсть', icon: 'fa-cloud' },
            rope: { name: 'Верёвка', icon: 'fa-link' },
            cloth: { name: 'Ткань', icon: 'icon-cloth' },

            grain: { name: 'Зерно', icon: 'fa-wheat-awn' },
            hay: { name: 'Сено', icon: 'fa-seedling' },
            vegetables: { name: 'Овощи', icon: 'fa-carrot' }
        };

        const RESOURCE_WEIGHTS = {
            fish: 0.6,
            meat: 1.2,
            mushrooms: 0.2,
            bread: 0.5,
            eggs: 0.2,
            milk: 1.0,

            ore: 3.0,
            bronze: 2.5,
            silver: 2.0,

            wheat: 0.8,
            wood: 1.0,
            stone: 1.5,
            herbs: 0.3,
            leather: 1.1,

            wool: 0.5,
            rope: 0.7,
            cloth: 0.6,

            grain: 0.7,
            hay: 1.2,
            vegetables: 0.6
        };

        const TOOL_WEIGHTS = {
            rod: 1.0,
            sickle: 1.2,
            pickaxe: 3.5,
            crossbow: 2.8,
            sword: 3.0
        };

        const SHOES_WEIGHTS = {
            peasant: 1.0,
            quality: 1.2,
            elite: 1.4
        };

        // --- GAME STATE ---
        const gameState = {
            gold: 0,
            emeralds: 0,
            xp: 0,
            level: 1,
            hp: 100,
            maxHp: 100,
            hunger: 100,
            maxHunger: 100,
            actionCount: 0,
            skillPoints: 0,
            luck: 0,
            agility: 0,
            reputation: 0,
            craftingLevel: 0,
            clothes: {},
            xpToNextLevel: 100,
            
            // Resources
            fish: 0,
            meat: 0,
            mushrooms: 0,
            bread: 0,
            eggs: 0,
            milk: 0,
            ore: 0,
            bronze: 0,
            silver: 0,
            wheat: 0,
            wood: 0,
            stone: 0,
            herbs: 0,
            leather: 0,
            wool: 0,
            rope: 0,
            cloth: 0,
            grain: 0,
            hay: 0,
            vegetables: 0,
            
            inventory: [],
            bagLevel: 0,
            // Tools State: owns boolean, current level
            tools: {
                rod: { owned: false, level: 0 },
                sickle: { owned: false, level: 0 },
                pickaxe: { owned: false, level: 0 },
                crossbow: { owned: false, level: 0 },
                sword: { owned: false, level: 0 }
            },
            livestock: {
                rabbit: false,
                chicken: false,
                pig: false,
                cow: false
            },
            
            // Quests
            activeQuests: [], 
            lastQuestGenTime: 0,
            storyQuests: [], // [{ id, title, desc, goals: {type, target, count}, reward: {gold, xp}, state: 'active'|'claimed' }]
            
            // NPC Memory
            npcStates: {}, // { npcId: { met: bool, stage: int } }
            
            // Port Event Tracking
            portWorkCount: 0,
            oldManEventTriggered: false,
            oldManEventThreshold: 0, // Set randomly 50-100 on first load

            // Village & House
            hasHouse: false,
            pigPenLevel: 0,
            meat: 0,
            lastMeatCollect: 0,
            hasHorse: false,
            livestock: {
                rabbit: false,
                chicken: false,
                pig: false,
                cow: false
            },

            // Shoes
            shoes: {
                peasant: false,
                quality: false,
                elite: false
            },
            
            // Disease
            hasMeasles: false,
            lastMeaslesTick: 0,

            // Unconscious
            unconsciousUntil: 0,
            lowHpWarnedAt: 0,

            // Random Events
            treasuryPouchResolved: false,
            bookhousePouchResolved: false,

            // Tavern Brawl
            lastBrawlTime: 0,

            // Features
            bankedGold: 0,
            lastLoginDate: null,
            installDate: null, // Track when user first played
            dailyStreak: 0,
            rentExpiry: 0,
            introShown: false,
            playerId: null,
            playerName: "Странник"
        };

        // --- NPC DATABASE ---
        const NPC_DB = {
            arthur: {
                name: "Артур",
                role: "Травник",
                icon: "fa-user-tie",
                dialogue: {
                    root: {
                        text: "Здравствуй, путник. Рад видеть, что ты на ногах. Чем могу помочь?",
                        options: [
                            { text: "Как заработать золота?", next: "earn" },
                            { text: "Что это за место?", next: "lore" },
                            { text: "Есть для меня работа?", next: "quest_check" },
                            { text: "Пока", next: "exit" }
                        ]
                    },
                    earn: {
                        text: "Самый простой способ — работать в Порту или на Поле. Но сначала тебе понадобится инструмент. Попроси мелочь на площади, чтобы купить удочку.",
                        options: [{ text: "Понял, спасибо", next: "root" }]
                    },
                    lore: {
                        text: "Это вольный город на границе королевства. Здесь каждый сам за себя, но если трудиться — можно разбогатеть. Остерегайся Темного леса, пока не окрепнешь.",
                        options: [{ text: "Ясно", next: "root" }]
                    },
                    quest_check: function() {
                        if (!hasStoryQuest('q_arthur_1') && !isQuestCompleted('q_arthur_1')) {
                            return "quest_offer";
                        }
                        return "no_quest";
                    },
                    quest_offer: {
                        text: "Мне нужно 3 рыбы для лекарства. Принесешь — заплачу. Кстати, как тебя зовут?",
                        options: [
                            { text: "Сказать имя", action: "set_player_name", next: "quest_accepted" },
                            { text: "Не сейчас", next: "root" }
                        ]
                    },
                    quest_accepted: {
                        text: "Отлично. Жду рыбу.",
                        options: [{ text: "Ухожу", next: "exit" }]
                    },
                    no_quest: {
                        text: "Пока ничего нет. Заходи позже.",
                        options: [{ text: "Ладно", next: "root" }]
                    }
                }
            },
            lili: {
                name: "Лили",
                role: "Хозяйка Книжного Дома",
                icon: "fa-feather",
                dialogue: {
                    root: function() {
                        if (!gameState.npcStates) gameState.npcStates = {};
                        gameState.npcStates.lili_visitCount = (gameState.npcStates.lili_visitCount || 0) + 1;
                        if (!gameState.npcStates.lili_invited && gameState.npcStates.lili_visitCount >= 4) {
                            gameState.npcStates.lili_invited = true;
                            game.save();
                            return "invite";
                        }
                        if (gameState.npcStates.lili_gifted) {
                            return "later";
                        }
                        if (gameState.npcStates.lili_waiting) {
                            return "gift";
                        }
                        game.save();
                        return "intro";
                    },
                    intro: {
                        text: "О, привет! Ты явно не местный. Мне нравится твой взгляд — такой уверенный, но чуть потерянный. Я Лили. Этот Дом — моя маленькая крепость знаний. А ты кто?",
                        options: [
                            { text: "Я странник, ищу путь", next: "about_you" },
                            { text: "Просто хочу посмотреть рецепты", next: "recipes" }
                        ]
                    },
                    about_you: {
                        text: "Странник? Звучит романтично. Я люблю истории о таких, как ты. Здесь, в городе, всё крутится вокруг ремесла и торговли. Кто хочет выжить — учится. Кто хочет процветать — учится у меня.",
                        options: [
                            { text: "Расскажи о городе", next: "city" },
                            { text: "А ты сама?", next: "about_me" }
                        ]
                    },
                    city: {
                        text: "Город живёт деньгами и слухами. Порт кормит бедняков, казна хранит золото, таверна — тайны. А я... я даю тем, кто достоин, знание. И иногда — чуточку внимания.",
                        options: [
                            { text: "Мне нужны рецепты", next: "recipes" },
                            { text: "Ты заигрываешь?", next: "flirt" }
                        ]
                    },
                    flirt: {
                        text: "Может быть. Разве это плохо? Город здесь серый, а с тобой немного ярче. Но не обольщайся — знания дороже поцелуев.",
                        options: [
                            { text: "Где твои рецепты?", next: "recipes" },
                            { text: "Вернусь позже", next: "wait" }
                        ]
                    },
                    about_me: {
                        text: "Я родилась здесь и всегда мечтала о большом мире. Но осталась, чтобы хранить книги. Скучно, если честно... Поэтому мне нравится разговаривать с путниками. Вроде тебя.",
                        options: [
                            { text: "Я зайду позже", next: "wait" },
                            { text: "Покажи, что продаешь", next: "recipes" }
                        ]
                    },
                    recipes: {
                        text: "У меня есть рецепты, которые могут сделать тебя сильнее или богаче. Еда, оружие, броня, даже сумка побольше. Все за изумруды — знания бесценны.",
                        options: [
                            { text: "Спасибо, Лили", next: "wait" },
                            { text: "Вернусь позже", next: "wait" }
                        ]
                    },
                    wait: {
                        text: "Загляни чуть позже, хорошо? Мне приятно, когда ты рядом. И, может, у меня появится кое-что интересное для тебя.",
                        options: [
                            { text: "Договорились", action: "lili_wait", next: "exit" }
                        ]
                    },
                    gift: {
                        text: "Ты пришёл! Я скучала... Вот, держи. Это редкий рецепт — кожаное седло для лошади. Если соберёшь коня, пригодится. А теперь... не исчезай снова.",
                        options: [
                            { text: "Спасибо, Лили", action: "lili_gift", next: "exit" },
                            { text: "Я зайду позже", action: "lili_gift", next: "exit" }
                        ]
                    },
                    invite: {
                        text: "Ты часто заходишь, и мне это приятно. Знаешь... я живу в дворянском квартале. Если будешь свободен — загляни ко мне. Отец из высшей знати, но я люблю простые беседы больше приемов.",
                        options: [
                            { text: "Я обязательно приду", action: "start_q_lili_visit", next: "later" },
                            { text: "Спасибо за приглашение", action: "start_q_lili_visit", next: "later" }
                        ]
                    },
                    later: {
                        text: "Ты снова здесь. Я рада. Поболтай со мной ещё, когда устанешь от приключений... Этот дом становится слишком тихим без тебя.",
                        options: [
                            { text: "Я зайду позже", next: "exit" },
                            { text: "До встречи", next: "exit" }
                        ]
                    }
                }
            },
            gorn: {
                name: "Горн",
                role: "Кузнец",
                icon: "fa-hammer",
                dialogue: {
                    root: {
                        text: "Нужна крепкая сталь? Или ищешь работу?",
                        options: [
                            { text: "Хочу купить оружие", next: "shop_hint" },
                            { text: "Есть дело?", next: "quest_check" },
                            { text: "Бывай", next: "exit" }
                        ]
                    },
                    shop_hint: {
                        text: "Смотри вкладку 'Мечник' или 'Бронник' в торговых рядах. Там всё мое добро.",
                        options: [{ text: "Ага", next: "root" }]
                    },
                    quest_check: function() {
                         if (!hasStoryQuest('q_gorn_1') && !isQuestCompleted('q_gorn_1') && gameState.level >= 3) {
                            return "quest_offer";
                        }
                        return "no_quest";
                    },
                    quest_offer: {
                        text: "Мне не хватает руды для заказа. Принеси 5 кусков руды из шахты.",
                        options: [
                            { text: "Сделаю", action: "start_q_gorn_1", next: "quest_accepted" },
                            { text: "Нет кирки", next: "root" }
                        ]
                    },
                    quest_accepted: {
                        text: "Не подведи. Руда нужна чистая.",
                        options: [{ text: "Понял", next: "exit" }]
                    },
                    no_quest: {
                        text: "Работы нет. Приходи, когда станешь опытнее (Ур 3+).",
                        options: [{ text: "Ясно", next: "root" }]
                    }
                }
            },
            ben: {
                name: "Старый Бен",
                role: "Трактирщик",
                icon: "fa-wine-glass",
                dialogue: {
                    root: {
                        text: "Чего желаешь? Эля или комнату?",
                        options: [
                            { text: "Какие слухи?", next: "rumors" },
                            { text: "Комната свободна?", next: "room_hint" },
                            { text: "Ухожу", next: "exit" }
                        ]
                    },
                    rumors: {
                        text: "Говорят, в Темном Лесу видели странные тени. И еще... кто-то разбогател на Колесе Удачи. Но чаще там проигрывают штаны, хе-хе.",
                        options: [{ text: "Интересно", next: "root" }]
                    },
                    room_hint: {
                        text: "Всегда найдется койка за 20 изумрудов. Лечит любые раны.",
                        options: [{ text: "Понял", next: "root" }]
                    }
                }
            },
            elara: {
                name: "Элара",
                role: "Следопыт",
                icon: "fa-hood-cloak",
                dialogue: {
                    root: {
                        text: "Тише. Лес не любит шумных гостей.",
                        options: [
                            { text: "Что ты тут делаешь?", next: "about" },
                            { text: "Нужна помощь?", next: "quest_check" },
                            { text: "Ухожу", next: "exit" }
                        ]
                    },
                    about: {
                        text: "Слежу за балансом. Если убивать слишком много волков, придут чудовища похуже.",
                        options: [{ text: "...", next: "root" }]
                    },
                    quest_check: function() {
                        if (!hasStoryQuest('q_elara_1') && !isQuestCompleted('q_elara_1')) {
                            return "quest_offer";
                        }
                        return "no_quest";
                    },
                    quest_offer: {
                        text: "Мне нужны целебные травы. Собери 5 трав в лесу.",
                        options: [
                            { text: "Поищу", action: "start_q_elara_1", next: "quest_accepted" },
                            { text: "Слишком опасно", next: "root" }
                        ]
                    },
                    quest_accepted: {
                        text: "Будь осторожен. Смотри под ноги.",
                        options: [{ text: "Ладно", next: "exit" }]
                    },
                    no_quest: {
                        text: "Лес спокоен. Пока что.",
                        options: [{ text: "Хорошо", next: "root" }]
                    }
                }
            },
            marius: {
                name: "Мариус",
                role: "Алхимик",
                icon: "fa-user-md",
                dialogue: {
                    root: {
                        text: "Хвори и раны - моя забота. Или ты ищешь знания?",
                        options: [
                            { text: "Мне нужно лечение", next: "heal_hint" },
                            { text: "Что за знания?", next: "recipes_hint" },
                            { text: "Есть поручения?", next: "quest_check" },
                            { text: "Прощай", next: "exit" }
                        ]
                    },
                    heal_hint: {
                        text: "Я могу затянуть твои раны за скромную плату. Кнопка в меню хижины.",
                        options: [{ text: "Понял", next: "root" }]
                    },
                    recipes_hint: {
                        text: "Я продаю древние рецепты зелий. Они даруют силу, недоступную смертным. Если у тебя есть изумруды, конечно.",
                        options: [{ text: "Посмотрю", next: "root" }]
                    },
                    quest_check: function() {
                         if (!hasStoryQuest('q_marius_1') && !isQuestCompleted('q_marius_1')) {
                            return "quest_offer";
                        }
                        return "no_quest";
                    },
                    quest_offer: {
                        text: "Мои запасы трав истощились. Принеси мне 5 пучков редких трав из леса, и я дам тебе скидку... может быть.",
                        options: [
                            { text: "Соберу", action: "start_q_marius_1", next: "quest_accepted" },
                            { text: "Нет времени", next: "root" }
                        ]
                    },
                    quest_accepted: {
                        text: "Травы должны быть свежими. Поторопись.",
                        options: [{ text: "Иду", next: "exit" }]
                    },
                    no_quest: {
                        text: "Пока мне ничего не нужно. Изучай рецепты.",
                        options: [{ text: "Ладно", next: "root" }]
                    }
                }
            },
            john_intro: {
                name: "Рыцарь Джон",
                role: "Воин",
                icon: "fa-user-shield",
                dialogue: {
                    root: {
                        text: "Держи монету, парень. Хм... А в тебе что-то есть. Крепкие руки, ясный взгляд.",
                        options: [
                            { text: "Спасибо, милорд", next: "offer" },
                            { text: "Кто вы?", next: "identity" }
                        ]
                    },
                    identity: {
                        text: "Я Джон, инструктор королевской гвардии. Я ищу таланты даже в сточных канавах.",
                        options: [{ text: "Я не из канавы!", next: "offer" }]
                    },
                    offer: {
                        text: "Слушай. Если хочешь стать настоящим воином, а не побираться тут — приходи в Учебный лагерь. Но сперва окрепни. Получи 15 уровень, и я жду тебя.",
                        options: [
                            { text: "Я приду!", action: "start_q_john_1", next: "accepted" },
                            { text: "Мне и тут неплохо", next: "exit" }
                        ]
                    },
                    accepted: {
                        text: "Слово мужчины. До встречи.",
                        options: [{ text: "До встречи", next: "exit" }]
                    }
                }
            },
            john: {
                name: "Рыцарь Джон",
                role: "Наставник",
                icon: "fa-user-shield",
                dialogue: {
                    root: {
                        text: "Добро пожаловать в лагерь. Готов к тренировкам?",
                        options: [
                            { text: "Я пришел по твоему вызову", next: "check_quest" },
                            { text: "Просто смотрю", next: "exit" }
                        ]
                    },
                    check_quest: function() {
                        if (hasStoryQuest('q_john_1') && !isQuestCompleted('q_john_1')) {
                            // Completing the quest
                            game.completeQuest('q_john_1');
                            return "welcome";
                        }
                        return "training";
                    },
                    welcome: {
                        text: "Молодец. Ты сдержал слово. Вот тебе награда на первое снаряжение. Скоро начнем муштру.",
                        options: [{ text: "Спасибо", next: "exit" }]
                    },
                    training: {
                        text: "Пока что отдыхай. Скоро прибудут новобранцы.",
                        options: [{ text: "Хорошо", next: "exit" }]
                    }
                }
            },
            thomas_intro: {
                name: "Томас",
                role: "Незнакомец",
                icon: "fa-user-secret",
                dialogue: {
                    root: {
                        text: "Приятного аппетита. Вижу, ты при деньгах, раз можешь позволить себе горячее. Не ищешь работу посерьезнее рыбалки?",
                        options: [
                            { text: "Смотря какую", next: "offer" },
                            { text: "Я не ищу проблем", next: "leave" }
                        ]
                    },
                    offer: {
                        text: "Я переправляю беженцев через границу. Дело рисковое, но платят щедро. Приходи в Лагерь беженцев, обсудим. Но запомни: без меча не приходи. В тех краях опасно.",
                        options: [
                            { text: "Я приду", action: "unlock_refugee", next: "exit" }
                        ]
                    },
                    leave: {
                        text: "Твое дело. Если передумаешь — я буду в лагере беженцев. Но нужен меч.",
                        options: [{ text: "Угу", action: "unlock_refugee", next: "exit" }]
                    }
                }
            },
            thomas: {
                name: "Томас",
                role: "Перевозчик",
                icon: "fa-user-secret",
                dialogue: {
                    root: {
                        text: "Ты пришел. Меч принес?",
                        options: [
                            { text: "Да, я готов", next: "check_sword" },
                            { text: "Нет пока", next: "no_sword" }
                        ]
                    },
                    check_sword: function() {
                        if (gameState.tools.sword && gameState.tools.sword.owned) {
                            return "job_start";
                        }
                        return "no_sword";
                    },
                    no_sword: {
                        text: "Я же сказал — без оружия не приходи. Купи на рынке или сделай сам. Возвращайся, когда будешь готов.",
                        options: [{ text: "Ладно", next: "exit" }]
                    },
                    job_start: {
                        text: "Отлично. Меч при тебе. Скоро выдвигаемся. (Продолжение следует...)",
                        options: [{ text: "Жду", next: "exit" }]
                    }
                }
            },
            oldman_port: {
                name: "Старик",
                role: "Бродяга",
                icon: "fa-person-cane",
                dialogue: {
                    root: {
                        text: "Эй, парень... Вижу, ты тут целый день вкалываешь. Устал, небось? У меня есть местечко неподалёку — тихо, тепло. Можешь переночевать, набраться сил. Бесплатно, по доброте душевной.",
                        options: [
                            { text: "Спасибо, дедушка! Пойдём.", action: "accept_oldman", next: "robbery" },
                            { text: "Нет, спасибо. Я сам справлюсь.", next: "refuse" }
                        ]
                    },
                    robbery: {
                        text: "Хе-хе... Наивный дурачок.",
                        options: [{ text: "...", next: "exit" }]
                    },
                    refuse: {
                        text: "Ну, как знаешь... Береги себя, парень.",
                        options: [{ text: "Прощай", next: "exit" }]
                    }
                }
            },
            alex: {
                name: "Алекс",
                role: "Помощник капитана",
                icon: "fa-anchor",
                dialogue: {
                    root: {
                        text: "Эй, ты! Да, ты, рыбак. Вижу, как ты тут каждый день горбатишься. Неплохо справляешься.",
                        options: [
                            { text: "Спасибо. А ты кто?", next: "intro" },
                            { text: "Чего надо?", next: "intro" }
                        ]
                    },
                    intro: {
                        text: "Меня зовут Алекс. Я помощник капитана на торговом судне. Нам нужны крепкие руки — разгружать мешки с зерном. Платим 6 золотых за подход, работа почти безопасная.",
                        options: [
                            { text: "Звучит неплохо! Я в деле.", action: "accept_alex_job", next: "accepted" },
                            { text: "Нет, я лучше рыбачить буду.", next: "refuse" }
                        ]
                    },
                    accepted: {
                        text: "Отлично! Теперь ты можешь работать грузчиком в порту. Найдёшь эту работу в списке. Удачи, парень!",
                        options: [{ text: "Спасибо!", next: "exit" }]
                    },
                    refuse: {
                        text: "Как знаешь. Если передумаешь — я буду здесь.",
                        options: [{ text: "Ладно", next: "exit" }]
                    }
                }
            },
            peter: {
                name: "Питер",
                role: "Портной",
                icon: "fa-scissors",
                dialogue: {
                    root: {
                        text: "Ох, дружище, ты выглядишь как помятый мешок. В этом городе, чтобы тебя уважали, нужно выглядеть опрятно.",
                        options: [
                            { text: "Что ты предлагаешь?", next: "offer" },
                            { text: "Почему это так важно?", next: "why" },
                            { text: "Ладно, ухожу", next: "exit" }
                        ]
                    },
                    why: {
                        text: "Здесь все смотрят на внешний вид. Чистая одежда — первое, что отличает путника от нищего. И новые заказчики любят порядок.",
                        options: [ { text: "Покажи варианты", next: "offer" } ]
                    },
                    offer: {
                        text: "Я могу сшить три комплекта: крестьянин за 5000 золотых, состоятельный за 50000, и одежда знати за 500 изумрудов. Что выберешь?",
                        options: [
                            { text: "Крестьянин (5000 золота)", action: "buy_peasant", next: "root" },
                            { text: "Состоятельный (50000 золота)", action: "buy_rich", next: "root" },
                            { text: "Знать (500 изумрудов)", action: "buy_noble", next: "root" },
                            { text: "Подумаю", next: "exit" }
                        ]
                    }
                }
            },
            librarian: {
                name: "Библиотекарь Генрих",
                role: "Хранитель рецептов",
                icon: "fa-glasses",
                dialogue: {
                    root: {
                        text: "Добро пожаловать в Книжный Дом. Здесь собраны знания со всего королевства.",
                        options: [
                            { text: "Что ты продаёшь?", next: "about_recipes" },
                            { text: "Расскажи о себе", next: "about_self" },
                            { text: "Прощай", next: "exit" }
                        ]
                    },
                    about_recipes: {
                        text: "Я продаю рецепты для крафта. Еда восстановит здоровье, оружие усилит удары, броня защитит, а улучшенная сумка даст больше места для вещей. Всё стоит изумрудов — редкие знания не бесплатны.",
                        options: [{ text: "Понятно", next: "root" }]
                    },
                    about_self: {
                        text: "Я посвятил жизнь сбору знаний. Путешествовал по землям, записывал секреты мастеров. Теперь делюсь ими... за небольшую плату.",
                        options: [{ text: "Интересно", next: "root" }]
                    }
                }
            },
            bandits_village: {
                name: "Бандиты",
                role: "Шайка у трактира",
                icon: "fa-mask",
                dialogue: {
                    root: {
                        text: "Стой, путник. Проход через нашу деревню стоит 200 золотых. Плати — и уйдешь целым.",
                        options: [
                            { text: "Ладно, держите золото", action: "bandits_pay", next: "paid" },
                            { text: "Попытаюсь убежать", action: "bandits_run", next: "robbed" },
                            { text: "Я один из ваших. Золтан меня знает", action: "bandits_bluff", next: "bluff" }
                        ]
                    },
                    paid: {
                        text: "Умно. Проходи. И не возвращайся без пошлины.",
                        options: [{ text: "Ухожу", next: "exit" }]
                    },
                    robbed: {
                        text: "Ха! Бежать вздумал? Слабак.",
                        options: [{ text: "...", next: "exit" }]
                    },
                    bluff: {
                        text: "Золтан? Ах да… прости, брат. Проходи. И не держи зла.",
                        options: [{ text: "Ладно", next: "exit" }]
                    }
                }
            },
            sage: {
                name: "Мудрец Эльдар",
                role: "Хранитель знаний",
                icon: "fa-hat-wizard",
                dialogue: {
                    root: {
                        text: "Приветствую тебя, странник. Я Эльдар, хранитель древних знаний. Чем могу помочь?",
                        options: [
                            { text: "Расскажи о деревне", next: "about_village" },
                            { text: "У тебя есть рецепты?", next: "recipes" },
                            { text: "Мне нужна помощь с болезнью", next: "disease_check" },
                            { text: "Есть задание?", next: "quest_check" },
                            { text: "Прощай", next: "exit" }
                        ]
                    },
                    about_village: {
                        text: "Эта деревня — тихое место вдали от городской суеты. Здесь можно купить дом, завести хозяйство, выращивать свиней. Мясо и кожа — ценные ресурсы.",
                        options: [{ text: "Интересно", next: "root" }]
                    },
                    recipes: {
                        text: "Я продаю редкие рецепты зелий. Зелье Силы усилит твои удары, Зелье Скорости ускорит работу. Но они стоят изумрудов.",
                        options: [{ text: "Посмотрю", next: "root" }]
                    },
                    disease_check: function() {
                        if (gameState.hasMeasles) {
                            return "disease_cure";
                        }
                        return "no_disease";
                    },
                    disease_cure: {
                        text: "Вижу, ты заразился Корью в лесу. Опасная болезнь — она медленно убивает. Принеси мне 15 трав и 10 грибов, и я приготовлю лекарство.",
                        options: [
                            { text: "У меня есть ингредиенты", action: "try_cure", next: "root" },
                            { text: "Пойду соберу", next: "exit" }
                        ]
                    },
                    no_disease: {
                        text: "Ты здоров, странник. Но будь осторожен в Темном Лесу — там можно подхватить Корь.",
                        options: [{ text: "Буду осторожен", next: "root" }]
                    },
                    quest_check: function() {
                        if (!hasStoryQuest('q_sage_1') && !isQuestCompleted('q_sage_1')) {
                            return "quest_offer";
                        }
                        return "no_quest";
                    },
                    quest_offer: {
                        text: "Мне нужны редкие грибы из глубин леса. Принеси 20 грибов, и я щедро награжу тебя.",
                        options: [
                            { text: "Соберу!", action: "start_q_sage_1", next: "quest_accepted" },
                            { text: "Слишком много", next: "root" }
                        ]
                    },
                    quest_accepted: {
                        text: "Будь осторожен в лесу. Грибы растут в самых темных местах.",
                        options: [{ text: "Понял", next: "exit" }]
                    },
                    no_quest: {
                        text: "Пока мне ничего не нужно. Изучай мои рецепты.",
                        options: [{ text: "Хорошо", next: "root" }]
                    }
                }
            },
            castle_guard: {
                name: "Стражник",
                role: "Королевская стража",
                icon: "fa-shield",
                dialogue: {
                    root: {
                        text: "Эй, стой! Тебе здесь не место. Вход только для рыцарей и знати.",
                        options: [
                            { text: "Я просто посмотреть...", next: "dismiss" },
                            { text: "А если я рыцарь?", next: "deny" },
                            { text: "Ухожу", next: "exit" }
                        ]
                    },
                    dismiss: {
                        text: "Сказал же — проваливай. Ты не похож ни на одного из них.",
                        options: [{ text: "Ладно", next: "exit" }]
                    },
                    deny: {
                        text: "Рыцарь? Ха. Смотри в свои лохмотья. Тут таким не место.",
                        options: [{ text: "Понял", next: "exit" }]
                    }
                }
            },
            fortress_guard: {
                name: "Капрал",
                role: "Страж крепости",
                icon: "fa-shield-halved",
                dialogue: {
                    root: function() {
                        if (gameState.npcStates && gameState.npcStates.campTrained) return "allow";
                        return "deny";
                    },
                    deny: {
                        text: "Стой. В крепость пускают только тех, кто прошёл подготовку в Учебном лагере. Ты ещё не готов.",
                        options: [
                            { text: "Понял, вернусь позже", next: "exit" }
                        ]
                    },
                    allow: {
                        text: "Вижу печать наставника. Проходи. Здесь слабых не держат.",
                        options: [
                            { text: "Я готов", next: "exit" }
                        ]
                    }
                }
            },
            noble_guard: {
                name: "Стражник квартала",
                role: "Дворцовая охрана",
                icon: "fa-shield-halved",
                dialogue: {
                    root: {
                        text: "Стой. Дворянский квартал не для оборванцев. Переоденься хотя бы в приличную одежду.",
                        options: [
                            { text: "Где взять одежду?", next: "clothes" },
                            { text: "Я уйду", next: "exit" }
                        ]
                    },
                    clothes: {
                        text: "Купи одежду у портного на площади. Чистая рубаха — пропуск в этот район.",
                        options: [{ text: "Понял", next: "exit" }]
                    }
                }
            },
            shoemaker: {
                name: "Лорен",
                role: "Сапожник",
                icon: "fa-shoe-prints",
                dialogue: {
                    root: {
                        text: "Хорошая обувь спасёт от мозолей, дождя и простуды. Без неё ты долго не протянешь в дороге.",
                        options: [
                            { text: "Какая обувь лучше?", next: "advice" },
                            { text: "Я посмотрю товары", next: "exit" }
                        ]
                    },
                    advice: {
                        text: "Чем качественнее обувь, тем больше уважения от горожан. А грязные сапоги — путь к насмешкам.",
                        options: [{ text: "Понял", next: "exit" }]
                    }
                }
            }
        };

        // Helpers for Dialogue
        function hasStoryQuest(id) {
            return (gameState.storyQuests || []).some(q => q.id === id);
        }
        function isQuestCompleted(id) {
            // Check completed history if we added it, for now just check if not active and reward claimed logic
            // Simplified: we'll check a flag in npcStates or just assumed claimed quests are removed or marked
            return (gameState.storyQuests || []).some(q => q.id === id && q.state === 'claimed');
        }

        const dialogue = {
            currentNPC: null,
            
            start: function(npcId) {
                const npc = NPC_DB[npcId];
                if (!npc) return;
                
                this.currentNPC = npcId;
                document.getElementById('npc-name').innerText = npc.name;
                document.getElementById('npc-role').innerText = npc.role;
                
                const iconContainer = document.getElementById('npc-icon').parentNode;
                // Simple color logic
                let colorClass = "border-gray-500";
                if(npcId === 'arthur') colorClass = "border-[#c8aa6e]";
                else if(npcId === 'ben') colorClass = "border-orange-500";
                else if(npcId === 'elara') colorClass = "border-purple-500";
                
                iconContainer.className = `w-12 h-12 rounded-full border ${colorClass} bg-[#222] flex items-center justify-center overflow-hidden shrink-0`;
                document.getElementById('npc-icon').className = `fas ${npc.icon} text-xl text-gray-300`;

                this.renderNode('root');
                document.getElementById('modal-dialogue').classList.add('open');
            },
            
            close: function() {
                document.getElementById('modal-dialogue').classList.remove('open');
                this.currentNPC = null;
            },
            
            renderNode: function(nodeKey) {
                const npc = NPC_DB[this.currentNPC];
                let node = npc.dialogue[nodeKey];
                
                // If node is a function, execute it to get the real node key
                if (typeof node === 'function') {
                    const nextKey = node();
                    node = npc.dialogue[nextKey];
                }

                document.getElementById('npc-text').innerText = node.text;
                
                const optsContainer = document.getElementById('npc-options');
                optsContainer.innerHTML = '';
                
                node.options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = "w-full text-left p-2 rounded bg-[#222] hover:bg-[#333] border border-[#333] text-xs text-[#c8aa6e] transition-colors";
                    btn.innerText = `> ${opt.text}`;
                    btn.onclick = () => {
                        if (opt.action) this.handleAction(opt.action);
                        
                        if (opt.next === 'exit') this.close();
                        else this.renderNode(opt.next);
                    };
                    optsContainer.appendChild(btn);
                });
            },
            
            handleAction: function(action) {
                if (action === 'start_q_arthur_1') {
                    this.addQuest('q_arthur_1', 'Просьба Артура', 'Принести 3 рыбы Артуру.', {type: 'gather', target: 'fish', count: 3}, {gold: 50, xp: 10});
                }
                if (action === 'start_q_gorn_1') {
                    this.addQuest('q_gorn_1', 'Руда для Кузнеца', 'Добыть 5 руды для Горна.', {type: 'gather', target: 'ore', count: 5}, {gold: 250, xp: 50});
                }
                if (action === 'start_q_elara_1') {
                    this.addQuest('q_elara_1', 'Лесные травы', 'Собрать 5 трав для Элары.', {type: 'gather', target: 'herbs', count: 5}, {gold: 100, xp: 30});
                }
                if (action === 'start_q_john_1') {
                    this.addQuest('q_john_1', 'Путь Воина', 'Достичь 15 уровня и прийти в Учебный лагерь.', {type: 'visit', target: 'camp', count: 1}, {gold: 500, xp: 100});
                }
                if (action === 'start_q_marius_1') {
                    this.addQuest('q_marius_1', 'Травы для Мариуса', 'Собрать 5 трав.', {type: 'gather', target: 'herbs', count: 5}, {gold: 75, xp: 25});
                }
                if (action === 'set_player_name') {
                    const name = prompt('Как тебя зовут?').trim();
                    if (name) {
                        gameState.playerName = name.slice(0, 20);
                        game.save();
                        ui.updateStats();
                        ui.showFloatText(document.body, `Имя обновлено: ${gameState.playerName}`, "#34d399");
                    }
                    this.addQuest('q_arthur_1', 'Просьба Артура', 'Принести 3 рыбы Артуру.', {type: 'gather', target: 'fish', count: 3}, {gold: 50, xp: 10});
                }
                if (action === 'accept_oldman') {
                    const stolenGold = gameState.gold;
                    gameState.gold = 0;
                    const damage = Math.floor(Math.random() * 20) + 30;
                    gameState.hp = Math.max(1, gameState.hp - damage);
                    game.addReputation(-5, document.body);
                    game.save();
                    ui.updateStats();
                    setTimeout(() => {
                        ui.showFloatText(document.body, `Ограбление! -${stolenGold} золота`, "#ff5555");
                        setTimeout(() => {
                            ui.showFloatText(document.body, `-${damage} HP (Удар камнем!)`, "#ef4444");
                        }, 500);
                    }, 300);
                }
                if (action === 'accept_alex_job') {
                    if (!gameState.npcStates) gameState.npcStates = {};
                    gameState.npcStates.alex_job_unlocked = true;
                    game.save();
                    ui.showFloatText(document.body, "Новая работа: Грузчик!", "#fbbf24");
                    ui.updateJobs();
                }
                if (action === 'buy_peasant') {
                    game.buyClothes('peasant', 5000);
                }
                if (action === 'buy_rich') {
                    game.buyClothes('rich', 50000);
                }
                if (action === 'buy_noble') {
                    game.buyClothes('noble', 500);
                }
                if (action === 'start_q_sage_1') {
                    this.addQuest('q_sage_1', 'Грибы для Мудреца', 'Собрать 20 грибов для Эльдара.', {type: 'gather', target: 'mushrooms', count: 20}, {gold: 300, xp: 80});
                }
                if (action === 'unlock_refugee') {
                    if (!gameState.npcStates) gameState.npcStates = {};
                    gameState.npcStates.thomas_met = true;
                    game.save();
                    ui.updateLocations();
                    ui.showFloatText(document.body, "Лагерь беженцев открыт", "#fbbf24");
                }
                if (action === 'try_cure') {
                    village.cureMeasles();
                }
                if (action === 'bandits_pay') {
                    gameState.gold = Math.max(0, gameState.gold - 200);
                    gameState.npcStates.villageBanditsDone = true;
                    game.addReputation(1, document.body);
                    game.save();
                    ui.updateStats();
                    ui.showFloatText(document.body, "-200 Золота", "#ff5555");
                }
                if (action === 'bandits_run') {
                    gameState.gold = Math.max(0, gameState.gold - 200);
                    gameState.hp = Math.max(1, gameState.hp - 30);
                    gameState.npcStates.villageBanditsDone = true;
                    game.addReputation(-2, document.body);
                    game.save();
                    ui.updateStats();
                    ui.showFloatText(document.body, "-200 Золота", "#ff5555");
                    setTimeout(() => ui.showFloatText(document.body, "-30 HP", "#ef4444"), 400);
                }
                if (action === 'bandits_bluff') {
                    gameState.npcStates.villageBanditsDone = true;
                    game.addReputation(-1, document.body);
                    game.save();
                    ui.updateStats();
                    ui.showFloatText(document.body, "Отпущен без платы", "#34d399");
                }
                if (action === 'lili_wait') {
                    if (!gameState.npcStates) gameState.npcStates = {};
                    gameState.npcStates.lili_waiting = true;
                    gameState.npcStates.lili_wait_time = Date.now();
                    game.save();
                }
                if (action === 'lili_gift') {
                    if (!gameState.npcStates) gameState.npcStates = {};
                    gameState.npcStates.lili_gifted = true;
                    gameState.npcStates.lili_waiting = false;
                    if (!gameState.recipes) gameState.recipes = {};
                    gameState.recipes.saddle = true;
                    game.addReputation(2, document.body);
                    game.save();
                    ui.showFloatText(document.body, "Рецепт: Кожаное седло", "#34d399");
                }
                if (action === 'start_q_lili_visit') {
                    this.addQuest('q_lili_visit', 'Приглашение Лили', 'Навестить Лили в Дворянском квартале.', {type: 'visit', target: 'noble-quarter', count: 1}, {gold: 0, xp: 50});
                }
            },
            
            addQuest: function(id, title, desc, goals, reward) {
                if (!gameState.storyQuests) gameState.storyQuests = [];
                gameState.storyQuests.push({
                    id: id,
                    title: title,
                    desc: desc,
                    goals: goals, // Using 'sell' type logic for gathering just for tracking simplicity or create new type
                    current: 0,
                    reward: reward,
                    state: 'active'
                });
                game.save();
                ui.showFloatText(document.body, "Новое задание!", "#fbbf24");
            },
            
            // Helper to complete quest manually (dialogue driven)
            completeQuest: function(id) {
                // We rely on quests.claimStory logic but triggered manually without button
                quests.claimStory(id, true);
            }
        };

        // --- QUESTS CONTROLLER ---
        const quests = {
            currentTab: 'daily',
            timerInterval: null,

            init: function() {
                this.checkDailyQuests();
                this.startTimer();
            },

            switchTab: function(tab) {
                this.currentTab = tab;
                document.querySelectorAll('#view-quests .sub-tab').forEach(el => el.classList.remove('active'));
                document.getElementById(`tab-quests-${tab}`).classList.add('active');
                this.render();
            },

            getMskDayKey: function(ts) {
                return Math.floor((ts + 3 * 60 * 60 * 1000) / 86400000);
            },

            getNextResetTs: function(nowTs = Date.now()) {
                const next = new Date(nowTs);
                next.setUTCHours(21, 0, 0, 0);
                if (nowTs >= next.getTime()) {
                    next.setUTCDate(next.getUTCDate() + 1);
                }
                return next.getTime();
            },

            checkDailyQuests: function() {
                const nowTs = Date.now();
                const lastTs = gameState.lastQuestGenTime || 0;

                const needRefresh =
                    !gameState.activeQuests ||
                    gameState.activeQuests.length === 0 ||
                    this.getMskDayKey(nowTs) !== this.getMskDayKey(lastTs);

                if (needRefresh) {
                    this.generateDailyQuests();
                    return true;
                }
                return false;
            },

            generateDailyQuests: function() {
                const newQuests = [];
                for (let i = 0; i < 3; i++) {
                    newQuests.push(this.createRandomQuest(i));
                }
                gameState.activeQuests = newQuests;
                gameState.lastQuestGenTime = Date.now();
                game.save();
            },

            createRandomQuest: function(index) {
                const types = [
                    { type: 'sell', target: 'fish', text: 'Продать рыбу', baseGoal: 20, reward: 2 },
                    { type: 'sell', target: 'wheat', text: 'Продать пшеницу', baseGoal: 30, reward: 3 },
                    { type: 'sell', target: 'ore', text: 'Продать руду', baseGoal: 50, reward: 5 },
                    { type: 'sell', target: 'leather', text: 'Продать кожу', baseGoal: 5, reward: 8 },
                    { type: 'upgrade', target: 'rod', text: 'Улучшить удочку', baseGoal: 1, reward: 10 },
                    { type: 'upgrade', target: 'sickle', text: 'Улучшить серп', baseGoal: 1, reward: 8 },
                    { type: 'upgrade', target: 'pickaxe', text: 'Улучшить кирку', baseGoal: 1, reward: 9 },
                    { type: 'work', target: 'port', text: 'Работать в порту', baseGoal: 20, reward: 2 },
                    { type: 'work', target: 'mine', text: 'Работать в шахте', baseGoal: 10, reward: 4 }
                ];

                const template = types[Math.floor(Math.random() * types.length)];

                const goal = Math.max(1, Math.floor(template.baseGoal * (1 + Math.random())));
                const reward = Math.max(2, Math.floor(template.reward * (1 + Math.random())));

                return {
                    id: Date.now() + index,
                    text: `${template.text}`,
                    type: template.type,
                    target: template.target,
                    goal: goal,
                    current: 0,
                    reward: reward,
                    claimed: false
                };
            },

            onEvent: function(eventType, target, amount) {
                let updated = false;
                // Daily Quests
                (gameState.activeQuests || []).forEach(q => {
                    if (!q.claimed && q.type === eventType && q.target === target) {
                        q.current += amount;
                        if (q.current > q.goal) q.current = q.goal;
                        updated = true;
                    }
                });
                // Story Quests
                // Mapping actions to quest types.
                // Gathering/Selling logic in this game acts as 'acquire' for quest purposes usually
                // For this implementation, we map 'sell' events (which happen when you have resources)
                // OR 'work' events (getting resources) to quest progress.
                // Let's assume gathering/working adds to the counter.
                
                // For simplicity in this codebase structure: 
                // We'll update quests when you GAIN resources (via work/gather) or SELL resources.
                // The prompt implies 'Bring 3 fish' -> usually implies having them or collecting them.
                // Let's count "Gathered/Acquired" resources.
                
                if (eventType === 'work' || eventType === 'gather' || eventType === 'sell' || eventType === 'visit') {
                     (gameState.storyQuests || []).forEach(q => {
                        if (q.state === 'active' && q.goals.target === target) {
                            q.current += amount;
                            // Cap at goal for UI niceness, but keep logic open
                            if (q.current > q.goals.count) q.current = q.goals.count;
                            updated = true;
                        }
                    });
                }

                if (updated) {
                    game.save();
                    if (router.currentTab === 'quests') this.render();
                }
            },

            claim: function(id) {
                const q = (gameState.activeQuests || []).find(q => q.id === id);
                if (q && !q.claimed && q.current >= q.goal) {
                    q.claimed = true;
                    gameState.emeralds += q.reward;
                    game.save();
                    ui.updateStats();
                    ui.showFloatText(event.target, `+${q.reward} Изумрудов`, "#34d399");
                    this.render();
                }
            },

            claimStory: function(id, force = false) {
                const q = (gameState.storyQuests || []).find(q => q.id === id);
                if (q && q.state === 'active' && (force || q.current >= q.goals.count)) {
                    q.state = 'claimed';
                    // Force complete implies progress met just now
                    if (force) q.current = q.goals.count;

                    // Story flags
                    if (!gameState.npcStates) gameState.npcStates = {};
                    if (id === 'q_john_1') {
                        gameState.npcStates.campTrained = true; // training completed
                    }

                    gameState.gold += q.reward.gold;
                    game.addXp(q.reward.xp);
                    game.save();
                    ui.updateStats();
                    // If triggered from dialogue, event.target might not be valid or needed
                    const target = (typeof event !== 'undefined' && event && event.target) ? event.target : document.body;
                    ui.showFloatText(target, `+${q.reward.gold} Gold +${q.reward.xp} XP`, "#fbbf24");
                    game.addReputation(2, target);
                    this.render();
                }
            },

            startTimer: function() {
                if (this.timerInterval) return;

                this.timerInterval = setInterval(() => {
                    const refreshed = this.checkDailyQuests();

                    if (router.currentTab === 'quests' && this.currentTab === 'daily') {
                        if (refreshed) this.render();
                        else this.updateTimerDisplay();
                    }
                }, 1000);
            },

            updateTimerDisplay: function() {
                const el = document.getElementById('quest-timer');
                if (!el) return;

                const nowTs = Date.now();
                const nextTs = this.getNextResetTs(nowTs);
                let diff = Math.max(0, nextTs - nowTs);

                const h = Math.floor(diff / 3600000);
                diff %= 3600000;
                const m = Math.floor(diff / 60000);
                diff %= 60000;
                const s = Math.floor(diff / 1000);

                el.innerText = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
            },

            render: function() {
                const list = document.getElementById('quests-list');
                list.innerHTML = '';

                if (this.currentTab === 'daily') {
                    if (!gameState.activeQuests || gameState.activeQuests.length === 0) {
                        list.innerHTML = '<div class="text-center text-[#a0a0a0] py-4">Нет активных заданий</div>';
                        return;
                    }

                    gameState.activeQuests.forEach(q => {
                        const progress = Math.min(100, (q.current / q.goal) * 100);
                        const isDone = q.current >= q.goal;

                        const el = document.createElement('div');
                        el.className = `panel p-3 rounded flex flex-col gap-2 ${q.claimed ? 'opacity-50' : ''}`;
                        el.innerHTML = `
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="text-sm text-[#e0e0e0] font-bold">${q.text}</div>
                                    <div class="text-xs text-[#a0a0a0]">${q.current} / ${q.goal}</div>
                                </div>
                                <div class="text-xs text-emerald-400 font-bold border border-emerald-900 bg-emerald-900/20 px-2 py-1 rounded">
                                    +${q.reward} <i class="far fa-gem"></i>
                                </div>
                            </div>
                            <div class="w-full h-1.5 bg-[#000] rounded-full overflow-hidden border border-[#333]">
                                <div class="h-full bg-[#c8aa6e] transition-all duration-300" style="width: ${progress}%"></div>
                            </div>
                            ${isDone && !q.claimed ?
                                `<button onclick="quests.claim(${q.id})" class="btn-medieval w-full py-1 text-xs rounded mt-1">Забрать награду</button>` :
                                ''}
                            ${q.claimed ? '<div class="text-center text-[10px] text-green-500 uppercase">Выполнено</div>' : ''}
                        `;
                        list.appendChild(el);
                    });

                    // Countdown to next reset (00:00 MSK)
                    const timerWrap = document.createElement('div');
                    timerWrap.className = "text-center text-[11px] text-[#777] mt-2";
                    timerWrap.innerHTML = `До обновления (00:00 МСК): <span id="quest-timer" class="text-[#c8aa6e] font-mono">--:--:--</span>`;
                    list.appendChild(timerWrap);
                    this.updateTimerDisplay();

                } else {
                    if (!gameState.storyQuests || gameState.storyQuests.length === 0) {
                        list.innerHTML = `
                            <div class="panel p-4 rounded text-center opacity-70">
                                <i class="fas fa-user-secret text-4xl text-[#555] mb-2"></i>
                                <p class="text-sm text-[#a0a0a0]">Персонажи молчат...</p>
                                <p class="text-xs text-[#555]">Поговорите с жителями (Артур, Горн, Бен), чтобы получить задания.</p>
                            </div>
                        `;
                        return;
                    }

                    gameState.storyQuests.forEach(q => {
                        if (q.state === 'claimed') return; // Hide completed/claimed logic for now or move to separate list

                        const progress = Math.min(100, (q.current / q.goals.count) * 100);
                        const isDone = q.current >= q.goals.count;

                        const el = document.createElement('div');
                        el.className = "panel p-3 rounded flex flex-col gap-2 border-l-2 border-[#c8aa6e]";
                        el.innerHTML = `
                            <div class="flex justify-between items-start">
                                <div>
                                    <div class="text-sm text-[#c8aa6e] font-bold">${q.title}</div>
                                    <div class="text-[10px] text-[#a0a0a0] mb-1">${q.desc}</div>
                                    <div class="text-xs text-[#e0e0e0]">${q.current} / ${q.goals.count}</div>
                                </div>
                                <div class="text-right">
                                     <div class="text-[10px] text-yellow-500 font-bold">+${q.reward.gold} <i class="fas fa-coins"></i></div>
                                     <div class="text-[10px] text-blue-400 font-bold">+${q.reward.xp} XP</div>
                                </div>
                            </div>
                            <div class="w-full h-1.5 bg-[#000] rounded-full overflow-hidden border border-[#333]">
                                <div class="h-full bg-[#c8aa6e] transition-all duration-300" style="width: ${progress}%"></div>
                            </div>
                            ${isDone ?
                                `<button onclick="quests.claimStory('${q.id}')" class="btn-medieval w-full py-1 text-xs rounded mt-1">Завершить</button>` :
                                ''}
                        `;
                        list.appendChild(el);
                    });
                }
            }
        };

        // --- GAME LOGIC ---
        const game = {
            init: function() {
                this.load();
                this.calculateNextLevel();
                
                // Initialize resources if undefined (for backward-compatible saves)
                Object.keys(RESOURCE_NAMES).forEach(r => {
                    if (gameState[r] === undefined) gameState[r] = 0;
                });
                if (gameState.hp === undefined) gameState.hp = 100;
                if (gameState.maxHp === undefined) gameState.maxHp = 100;
                if (gameState.hunger === undefined) gameState.hunger = 100;
                if (gameState.maxHunger === undefined) gameState.maxHunger = 100;
                if (gameState.actionCount === undefined) gameState.actionCount = 0;
                if (gameState.lastHungerWarning === undefined) gameState.lastHungerWarning = 0;
                if (gameState.skillPoints === undefined) gameState.skillPoints = 0;
                if (gameState.luck === undefined) gameState.luck = 0;
                if (gameState.reputation === undefined) gameState.reputation = 0;
                if (gameState.craftingLevel === undefined) gameState.craftingLevel = 0;
                if (gameState.unconsciousUntil === undefined) gameState.unconsciousUntil = 0;
                if (gameState.lowHpWarnedAt === undefined) gameState.lowHpWarnedAt = 0;
                if (gameState.unconsciousUntil && gameState.unconsciousUntil > Date.now()) {
                    gameState.hp = 0;
                }
                
                quests.init();
                this.checkDailyReward();
                ui.updateAll();
                this.checkUnconscious();
                ui.updateUnconsciousUI();
                
                // Show Intro if not shown
                if (!gameState.introShown) {
                    setTimeout(() => document.getElementById('modal-intro').classList.add('open'), 500);
                }
                
                // Initialize new state fields if missing
                if(!gameState.recipes) gameState.recipes = { immortality: false, luck: false, saddle: false, bag: false };
                if(!gameState.effects) gameState.effects = { immortality: 0, luck: 0 };
                if (!gameState.npcStates) gameState.npcStates = {};
                if (gameState.hasPoorHouse === undefined) gameState.hasPoorHouse = false;
                if (gameState.hasNobleHouse === undefined) gameState.hasNobleHouse = false;
                if (gameState.bagLevel === undefined) gameState.bagLevel = 0;
                if (!gameState.playerId) {
                    gameState.playerId = Math.random().toString(36).slice(2, 10).toUpperCase();
                }
                if (!gameState.playerName) {
                    gameState.playerName = "Странник";
                }
                if (!gameState.shoes) gameState.shoes = { peasant: false, quality: false, elite: false };
                if (gameState.treasuryPouchResolved === undefined) gameState.treasuryPouchResolved = false;
                if (gameState.bookhousePouchResolved === undefined) gameState.bookhousePouchResolved = false;
                
                if (gameState.npcStates.lili_waiting && gameState.npcStates.lili_wait_time) {
                    const elapsed = Date.now() - gameState.npcStates.lili_wait_time;
                    if (elapsed > 1000 * 60 * 3) {
                        gameState.npcStates.lili_waiting = true;
                    }
                }
                
                this.updateEffectsLoop();

                // Telegram Init
                if (window.Telegram && window.Telegram.WebApp) {
                    const tg = window.Telegram.WebApp;
                    tg.ready();
                    tg.expand();
                    tg.setHeaderColor('#141417');
                    tg.setBackgroundColor('#0f0f10');
                }
            },

            save: function() {
                localStorage.setItem('medieval_rpg_save_v5', JSON.stringify(gameState));
            },

            load: function() {
                const save = localStorage.getItem('medieval_rpg_save_v5');
                if (save) {
                    const parsed = JSON.parse(save);
                    Object.assign(gameState, parsed);
                    if(!gameState.activeQuests) gameState.activeQuests = [];
                }
            },
            
            closeIntro: function(goToMap) {
                document.getElementById('modal-intro').classList.remove('open');
                gameState.introShown = true;
                this.save();
                if (goToMap) {
                    router.navigate('town-square');
                }
            },
            
            getJobReward: function(jobType) {
                const job = JOBS_DB[jobType];
                const toolState = gameState.tools[job.tool];
                let amount = 1;
                if (toolState.owned && toolState.level > 1) {
                    amount += (toolState.level - 1);
                }
                // Return as 'gold' property to match UI usage, though it represents resource amount
                return { gold: amount }; 
            },

            calculateNextLevel: function() {
                gameState.xpToNextLevel = gameState.level * 100;
            },

            addXp: function(amount) {
                gameState.xp += amount;
                if (gameState.xp >= gameState.xpToNextLevel) {
                    this.levelUp();
                }
                this.save();
                ui.updateStats();
            },

            addReputation: function(amount, sourceElement = null) {
                const prev = gameState.reputation || 0;
                const next = Math.max(0, Math.min(100, prev + amount));
                if (next === prev) return;
                gameState.reputation = next;
                this.save();
                ui.updateStats();
                if (sourceElement) {
                    const sign = amount > 0 ? '+' : '';
                    const color = amount > 0 ? '#34d399' : '#ef4444';
                    ui.showFloatText(sourceElement, `${sign}${amount} Репутации`, color);
                }
            },

            levelUp: function() {
                gameState.xp -= gameState.xpToNextLevel;
                gameState.level++;

                const goldReward = (gameState.level - 1) * 100;
                gameState.gold += goldReward;
                gameState.skillPoints = (gameState.skillPoints || 0) + 1;

                this.calculateNextLevel();
                ui.updateJobs();
                ui.updateStats();

                this.showLevelUpModal(goldReward);
                this.save();
            },

            showLevelUpModal: function(goldReward) {
                const modal = document.getElementById('modal-levelup');
                if (!modal) return;

                document.getElementById('levelup-new-level').innerText = gameState.level;
                document.getElementById('levelup-gold').innerText = goldReward;

                let msg = "Ваш путь продолжается. Откройте вкладку Герой и улучшайте навыки.";
                if (gameState.level === 2) {
                    msg = "Открылся Книжный Дом на площади. Покупайте рецепты и развивайте героя.";
                } else if (gameState.level === 3) {
                    msg = "Появилась работа Грузчика в порту. Порыбачьте, чтобы встретить Алекса.";
                } else if (gameState.level === 5) {
                    msg = "Открыты Пшеничное поле и Темный лес. Нужны серп и осторожность.";
                } else if (gameState.level === 10) {
                    msg = "Пора накопить на дом в деревне и начать хозяйство.";
                } else if (gameState.level === 15) {
                    msg = "Открыт Рудник и Учебный лагерь. Навестите Рыцаря Джона.";
                } else if (gameState.level === 30) {
                    msg = "Открыта охота. Самая опасная, но прибыльная работа.";
                }

                document.getElementById('levelup-message').innerText = msg;
                modal.classList.add('open');

                if (window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate([120, 60, 120]);
                }
            },

            closeLevelUp: function() {
                const modal = document.getElementById('modal-levelup');
                if (modal) modal.classList.remove('open');
            },
            
            heal: function(amount, cost) {
                if(gameState.gold >= cost) {
                    if (gameState.hp >= gameState.maxHp) {
                        ui.showFloatText(event.target, "Здоровье полно", "#c8aa6e");
                        return;
                    }
                    gameState.gold -= cost;
                    gameState.hp = Math.min(gameState.maxHp, gameState.hp + amount);
                    ui.showFloatText(event.target, `+${amount} HP`, "#ef4444");
                    ui.updateStats();
                    this.save();
                } else {
                    ui.showFloatText(event.target, "Не хватает золота", "#ff5555");
                }
            },

            addReputation: function(amount, sourceElement = null) {
                const prev = gameState.reputation || 0;
                const next = Math.max(0, Math.min(100, prev + amount));
                if (next === prev) return;
                gameState.reputation = next;
                this.save();
                ui.updateStats();
                if (sourceElement) {
                    const sign = amount > 0 ? '+' : '';
                    const color = amount > 0 ? '#34d399' : '#ef4444';
                    ui.showFloatText(sourceElement, `${sign}${amount} Репутации`, color);
                }
            },

            knockOut: function() {
                if (gameState.unconsciousUntil && gameState.unconsciousUntil > Date.now()) return;
                gameState.hp = 0;
                gameState.unconsciousUntil = Date.now() + 10 * 60 * 1000;
                this.save();
                ui.updateStats();
                ui.updateUnconsciousUI();
            },

            checkUnconscious: function() {
                const now = Date.now();
                
                // If timer is running
                if (gameState.unconsciousUntil && gameState.unconsciousUntil > now) {
                    // Force HP to 0 if it somehow isn't
                    if (gameState.hp !== 0) {
                        gameState.hp = 0;
                        this.save();
                        ui.updateStats();
                    }
                    // Ensure UI is showing unconscious state
                    if (!document.body.classList.contains('unconscious')) {
                        ui.updateUnconsciousUI();
                    }
                    return;
                }

                // If timer expired (wake up)
                if (gameState.unconsciousUntil && gameState.unconsciousUntil <= now) {
                    gameState.unconsciousUntil = 0;
                    gameState.hp = Math.max(gameState.hp, 15);
                    this.save();
                    ui.updateStats();
                    ui.updateUnconsciousUI();
                    ui.showFloatText(document.body, "Вы пришли в себя (+15 HP)", "#34d399");
                }
            },

            trackAction: function() {
                // Increment action count
                gameState.actionCount = (gameState.actionCount || 0) + 1;
                
                // Every 2 actions, decrease hunger by 1
                if (gameState.actionCount >= 2) {
                    gameState.actionCount = 0;
                    gameState.hunger = Math.max(0, gameState.hunger - 1);
                }
                
                this.save();
                ui.updateStats();
            },

            getHungerDamageMultiplier: function() {
                // Double damage when hunger is 0
                return gameState.hunger <= 0 ? 2 : 1;
            },

            checkDailyReward: function() {
                const today = new Date().toDateString();
                
                // First launch check
                if (!gameState.installDate) {
                    gameState.installDate = today;
                    gameState.lastLoginDate = today;
                    gameState.dailyStreak = 1;
                    this.save();
                    return; // Skip reward on first day
                }

                const last = gameState.lastLoginDate;
                
                if (last !== today) {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    
                    if (last === yesterday.toDateString()) {
                        gameState.dailyStreak++;
                    } else {
                        // Reset streak if missed a day, but keep 1
                        gameState.dailyStreak = 1;
                    }
                    setTimeout(() => {
                        ui.showDailyModal();
                    }, 1000);
                }
            },

            claimDaily: function() {
                const streak = gameState.dailyStreak;
                let reward = 30;
                if (streak === 1) reward = 5;
                else if (streak === 2) reward = 10;
                else if (streak === 3) reward = 15;
                else if (streak === 4) reward = 20;
                
                gameState.emeralds += reward;
                gameState.lastLoginDate = new Date().toDateString();
                this.save();
                
                document.getElementById('modal-daily').classList.remove('open');
                ui.updateAll();
                ui.showFloatText(document.body, `+${reward} Изумрудов`, "#34d399");
            },

            work: function(jobType, event) {
                if (gameState.hp <= 0 || (gameState.unconsciousUntil && gameState.unconsciousUntil > Date.now())) {
                    ui.showFloatText(event.target, "Вы без сознания", "#ff5555");
                    return;
                }

                const job = JOBS_DB[jobType];
                
                // Check level requirement
                if (job.levelReq && gameState.level < job.levelReq) {
                    ui.showFloatText(event.target, `Нужен Уровень ${job.levelReq}`, "#ff5555");
                    return;
                }
                
                // Check if job requires Alex unlock
                if (job.requiresAlex && (!gameState.npcStates || !gameState.npcStates.alex_job_unlocked)) {
                    ui.showFloatText(event.target, "Работа недоступна", "#ff5555");
                    return;
                }
                
                // Check tool requirement (skip for loader job)
                const toolState = job.tool ? gameState.tools[job.tool] : null;
                const toolDef = job.tool ? TOOLS_DB[job.tool] : null;

                if (toolDef && !toolState.owned) {
                    if (jobType === 'port' && gameState.gold >= TOOLS_DB.rod.baseCost) {
                        ui.showFloatText(event.target, "Удочку можно купить на рынке", "#fbbf24");
                    } else {
                        ui.showFloatText(event.target, `Нужна ${toolDef.name}`, "#ff5555");
                    }
                    return;
                }
                
                // Track port work for old man event
                if (jobType === 'port') {
                    // Initialize threshold if not set
                    if (!gameState.oldManEventThreshold) {
                        gameState.oldManEventThreshold = Math.floor(Math.random() * 51) + 50; // 50-100
                    }
                    
                    gameState.portWorkCount = (gameState.portWorkCount || 0) + 1;
                    
                    // Trigger Alex meeting at level 3
                    if (!gameState.npcStates) gameState.npcStates = {};
                    if (!gameState.npcStates.alex_met && gameState.level >= 3) {
                        gameState.npcStates.alex_met = true;
                        this.save();
                        
                        setTimeout(() => {
                            dialogue.start('alex');
                        }, 500);
                        return; // Don't process the work this time
                    }
                    
                    // Trigger old man event
                    if (!gameState.oldManEventTriggered && gameState.portWorkCount >= gameState.oldManEventThreshold && gameState.gold > 0) {
                        gameState.oldManEventTriggered = true;
                        this.save();
                        
                        setTimeout(() => {
                            dialogue.start('oldman_port');
                        }, 500);
                        return; // Don't process the work this time
                    }
                }
                
                // Injury Chance (custom for loader job - 1%, others - 10%)
                const injuryChance = job.injuryChance !== undefined ? job.injuryChance : 0.1;
                if (Math.random() < injuryChance) {
                    let dmg = Math.floor(Math.random() * 10) + 5;
                    // Apply hunger damage multiplier
                    dmg = Math.floor(dmg * this.getHungerDamageMultiplier());
                    gameState.hp = Math.max(0, gameState.hp - dmg);
                    ui.showFloatText(event.target, `-${dmg} HP (Травма!)`, "#ef4444");
                    ui.updateStats();
                    this.save();
                    return; 
                }

                let amount = 1;
                if (toolState && toolState.level > 1) {
                    amount += (toolState.level - 1);
                }

                // Chance for Emerald (only in Mine)
                const luckyDrop = (jobType === 'mine') && (Math.random() < 0.005);
                if (luckyDrop) {
                    gameState.emeralds += 1;
                    setTimeout(() => {
                        ui.showFloatText(event.target, `+1 ИЗУМРУД!`, "#34d399");
                    }, 200);
                }

                this.addXp(job.xp);

                // Handle loader job (gives gold directly)
                if (jobType === 'loader') {
                    const goldReward = job.price; // 6 gold
                    gameState.gold += goldReward;
                    ui.showFloatText(event.target, `+${goldReward} Золота`, "#c8aa6e");
                } else {
                    // Add Resource
                    const extraWeight = (RESOURCE_WEIGHTS[job.resource] || 0) * amount;
                    if (!this.hasWeightCapacity(extraWeight)) {
                        this.showWeightWarning(event.target);
                        return;
                    }
                    if (gameState[job.resource] === undefined) gameState[job.resource] = 0;
                    gameState[job.resource] += amount;
                    
                    const rName = RESOURCE_NAMES[job.resource].name;
                    ui.showFloatText(event.target, `+${amount} ${rName}`, "#e0e0e0");
                }
                
                // Quest Progress
                quests.onEvent('work', jobType, 1);
                // Also trigger gather event for story quests
                quests.onEvent('gather', job.resource, amount);

                // Track action for hunger system
                this.trackAction();

                ui.updateStats();
                if (window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(10);
                }
                
                this.save();
                ui.updateStats(); 
                ui.updateJobs();
            },

            buyRecipe: function(type, cost) {
                if (!gameState.recipes) gameState.recipes = {};

                if (gameState.emeralds >= cost) {
                    gameState.emeralds -= cost;
                    gameState.recipes[type] = true;
                    this.save();
                    ui.updateAll();
                    ui.showFloatText(event.target, "Рецепт куплен!", "#34d399");

                    if (type === 'immortality' || type === 'luck') {
                        document.getElementById('healer-crafting-station').classList.remove('hidden');
                        if (type === 'immortality') document.getElementById('craft-action-immortality').classList.remove('hidden');
                        if (type === 'luck') document.getElementById('craft-action-luck').classList.remove('hidden');
                    }

                    if (type === 'bag') {
                        ui.showFloatText(event.target, "Рюкзак можно улучшить в крафте", "#fbbf24");
                    }
                } else {
                    ui.showFloatText(event.target, "Не хватает изумрудов", "#ff5555");
                }
            },

            getWeightCapacity: function() {
                const base = 50;
                const upgrades = (gameState.bagLevel || 0) * 50;
                return base + upgrades;
            },

            getCurrentWeight: function() {
                let total = 0;
                Object.keys(RESOURCE_WEIGHTS).forEach(key => {
                    const count = gameState[key] || 0;
                    if (count > 0) total += count * RESOURCE_WEIGHTS[key];
                });
                Object.keys(gameState.tools || {}).forEach(key => {
                    if (gameState.tools[key] && gameState.tools[key].owned) {
                        total += TOOL_WEIGHTS[key] || 0;
                    }
                });
                if (gameState.shoes) {
                    Object.keys(gameState.shoes).forEach(key => {
                        if (gameState.shoes[key]) total += SHOES_WEIGHTS[key] || 0;
                    });
                }
                return Math.round(total * 10) / 10;
            },

            hasWeightCapacity: function(extra = 0) {
                return (this.getCurrentWeight() + extra) <= this.getWeightCapacity();
            },

            showWeightWarning: function(anchor) {
                ui.showFloatText(anchor || document.body, "Рюкзак перегружен", "#ff5555");
            },

            activateEffect: function(effectType) {
                if (!gameState.effects) gameState.effects = { immortality: 0, luck: 0 };
                
                if (effectType === 'immortality') {
                    if (gameState.herbs >= 10) {
                        gameState.herbs -= 10;
                        gameState.effects.immortality = Date.now() + 2 * 60 * 1000;
                        ui.showFloatText(event.target, "Бессмертие активировано!", "#ef4444");
                    } else {
                        ui.showFloatText(event.target, "Нужно 10 трав", "#ff5555");
                        return;
                    }
                }
                if (effectType === 'luck') {
                    if (gameState.mushrooms >= 5) {
                        gameState.mushrooms -= 5;
                        gameState.effects.luck = Date.now() + 2 * 60 * 1000;
                        ui.showFloatText(event.target, "Удача x2 активирована!", "#34d399");
                    } else {
                        ui.showFloatText(event.target, "Нужно 5 грибов", "#ff5555");
                        return;
                    }
                }
                this.save();
                ui.updateAll();
            },

            updateEffectsLoop: function() {
                setInterval(() => {
                    if (!gameState.effects) return;

                    const now = Date.now();
                    const immActive = gameState.effects.immortality > now;
                    const luckActive = gameState.effects.luck > now;

                    const effectsContainer = document.getElementById('active-effects-container');
                    const immEl = document.getElementById('effect-immortality');
                    const luckEl = document.getElementById('effect-luck');

                    if (immActive || luckActive) effectsContainer.classList.remove('hidden');
                    else effectsContainer.classList.add('hidden');

                    if (immActive) {
                        immEl.classList.remove('hidden');
                        const remaining = Math.max(0, Math.floor((gameState.effects.immortality - now) / 1000));
                        document.getElementById('timer-immortality').innerText = `${Math.floor(remaining/60)}:${String(remaining%60).padStart(2,'0')}`;
                    } else {
                        immEl.classList.add('hidden');
                    }

                    if (luckActive) {
                        luckEl.classList.remove('hidden');
                        const remaining = Math.max(0, Math.floor((gameState.effects.luck - now) / 1000));
                        document.getElementById('timer-luck').innerText = `${Math.floor(remaining/60)}:${String(remaining%60).padStart(2,'0')}`;
                    } else {
                        luckEl.classList.add('hidden');
                    }
                }, 1000);
            },

            completeQuest: function(id) {
                quests.claimStory(id, true);
            },

            buyClothes: function(type, cost) {
                market.buyClothes(type, cost);
            },

            gainReputationForClothes: function(type, sourceElement) {
                if (type === 'peasant') this.addReputation(2, sourceElement);
                if (type === 'rich') this.addReputation(5, sourceElement);
                if (type === 'noble') this.addReputation(8, sourceElement);
            }
        };

        // --- LOCATIONS CONTROLLER ---
        const locations = {
            beg: function(event) {
                // Check for Knight John encounter (random chance or first time after some progress)
                // Let's make it trigger if player has > 10 gold total earned or simply not met yet
                if (!gameState.npcStates) gameState.npcStates = {};
                
                if (!gameState.npcStates.john_met && Math.random() < 0.2) {
                     gameState.npcStates.john_met = true;
                     gameState.gold += 10; // The coin he throws
                     ui.showFloatText(event.target, "+10 Золота (Рыцарь!)", "#fbbf24");
                     ui.updateStats();
                     game.save();
                     
                     setTimeout(() => {
                         dialogue.start('john_intro');
                     }, 500);
                     return;
                }

                gameState.gold += 2;
                ui.showFloatText(event.target, "+2 Золота", "#c8aa6e");
                ui.updateStats();
                game.save();
            },

            treasuryDepositAll: function(event) {
                // Not used in HTML but kept for logic safety
                const anchor = (event && event.target) ? event.target : document.body;
                if (gameState.gold > 0) {
                    const amount = gameState.gold;
                    gameState.gold = 0;
                    gameState.bankedGold += amount;
                    game.save();
                    ui.updateStats();
                    ui.showFloatText(anchor, `Депозит ${amount}`, "#c8aa6e");
                } else {
                    ui.showFloatText(anchor, "Нет золота", "#ff5555");
                }
            },

            treasuryWithdrawAll: function(event) {
                 // Not used in HTML but kept for logic safety
                const anchor = (event && event.target) ? event.target : document.body;
                if (gameState.bankedGold > 0) {
                    const amount = gameState.bankedGold;
                    gameState.bankedGold = 0;
                    gameState.gold += amount;
                    game.save();
                    ui.updateStats();
                    ui.showFloatText(anchor, `Снято ${amount}`, "#c8aa6e");
                } else {
                    ui.showFloatText(anchor, "Сейф пуст", "#ff5555");
                }
            },
            
            treasurySetMax: function(type, event) {
                const input = document.getElementById('bank-amount-input');
                if (type === 'deposit') {
                    input.value = gameState.gold;
                } else {
                    input.value = gameState.bankedGold;
                }
            },
            
            treasuryDepositAmount: function(event) {
                const input = document.getElementById('bank-amount-input');
                const val = parseInt(input.value);
                if (!val || val <= 0) return;
                if (gameState.gold >= val) {
                    gameState.gold -= val;
                    gameState.bankedGold += val;
                    game.save();
                    ui.updateStats();
                    ui.showFloatText(event.target, `Депозит ${val}`, "#c8aa6e");
                    input.value = '';
                } else {
                    ui.showFloatText(event.target, "Не хватает", "#ff5555");
                }
            },
            
            treasuryWithdrawAmount: function(event) {
                const input = document.getElementById('bank-amount-input');
                const val = parseInt(input.value);
                if (!val || val <= 0) return;
                if (gameState.bankedGold >= val) {
                    gameState.bankedGold -= val;
                    gameState.gold += val;
                    game.save();
                    ui.updateStats();
                    ui.showFloatText(event.target, `Снято ${val}`, "#c8aa6e");
                    input.value = '';
                } else {
                    ui.showFloatText(event.target, "Не хватает", "#ff5555");
                }
            },

            treasuryExchange: function(event) {
                const anchor = (event && event.target) ? event.target : document.body;
                if (gameState.emeralds >= 1) {
                    gameState.emeralds -= 1;
                    gameState.gold += 1000;
                    game.save();
                    ui.updateStats();
                    ui.showFloatText(anchor, "+1000 Золота", "#c8aa6e");
                } else {
                    ui.showFloatText(anchor, "Нет изумрудов", "#ff5555");
                }
            },

            tavernRent: function() {
                if (gameState.emeralds >= 20) {
                    gameState.emeralds -= 20;
                    gameState.hp = gameState.maxHp; 
                    ui.updateStats();
                    ui.showFloatText(event.target, "Отдых... HP восстановлено!", "#34d399");
                    game.save();
                } else {
                    ui.showFloatText(event.target, "Не хватает изумрудов", "#ff5555");
                }
            },

            tavernBrawl: function(event) {
                if (gameState.hp < 20) {
                    ui.showFloatText(event.target, "Нужно 20+ HP", "#ff5555");
                    return;
                }
                const now = Date.now();
                const cooldown = 3600000; // 1 hour
                const last = gameState.lastBrawlTime || 0;
                
                if (now - last < cooldown) {
                    const left = Math.ceil((cooldown - (now - last)) / 60000);
                    ui.showFloatText(event.target, `Жди ${left} мин`, "#777");
                    return;
                }

                gameState.lastBrawlTime = now;
                
                // Fight logic
                // Chance to win increases with level
                const baseChance = 0.4;
                const levelBonus = (gameState.level * 0.02); // 2% per level
                const winChance = Math.min(0.8, baseChance + levelBonus);
                
                const btn = event.target;
                btn.disabled = true;
                btn.innerHTML = "<i class='fas fa-fist-raised animate-bounce'></i> Бой...";
                
                setTimeout(() => {
                    const won = Math.random() < winChance;
                    
                    if (won) {
                        const gold = 50 + Math.floor(Math.random() * 100);
                        const rep = 1;
                        gameState.gold += gold;
                        game.addReputation(rep, btn);
                        ui.showFloatText(btn, `Победа! +${gold} монет`, "#fbbf24");
                    } else {
                        let dmg = 15 + Math.floor(Math.random() * 15);
                        dmg = Math.floor(dmg * game.getHungerDamageMultiplier());
                        gameState.hp = Math.max(1, gameState.hp - dmg);
                        ui.showFloatText(btn, `Поражение... -${dmg} HP`, "#ef4444");
                    }
                    
                    game.save();
                    ui.updateStats();
                    ui.updateLocations(); // Updates timer text
                }, 1000);
            },

            tavernSpin: function() {
                const btn = document.getElementById('btn-spin');
                if (gameState.emeralds < 1) {
                    ui.showFloatText(btn, "Нужен 1 Изумруд", "#ff5555");
                    return;
                }

                gameState.emeralds -= 1;
                ui.updateStats();
                
                btn.disabled = true;
                const wheel = document.getElementById('wheel');
                wheel.classList.add('spin-anim');
                
                // Determine Reward
                const rand = Math.random() * 100;
                let reward = { type: 'gold', val: 1000, text: '1000 Золота' };
                
                if (rand < 1) reward = { type: 'gem', val: 100, text: '100 ИЗУМРУДОВ!' };
                else if (rand < 11) reward = { type: 'gem', val: 10, text: '10 Изумрудов' };
                else if (rand < 26) reward = { type: 'gold', val: 10000, text: '10,000 Золота' };
                else if (rand < 51) reward = { type: 'gold', val: 5000, text: '5,000 Золота' };
                
                setTimeout(() => {
                    wheel.classList.remove('spin-anim');
                    btn.disabled = false;
                    
                    if (reward.type === 'gold') gameState.gold += reward.val;
                    else gameState.emeralds += reward.val;
                    
                    game.save();
                    ui.updateStats();
                    
                    const color = reward.type === 'gem' ? '#34d399' : '#c8aa6e';
                    ui.showFloatText(btn, `+${reward.text}`, color);
                }, 1000);
            },

            tavernEat: function(type) {
                if (gameState.gold >= 100) {
                    if (gameState.hp >= gameState.maxHp && gameState.hunger >= gameState.maxHunger) {
                        ui.showFloatText(event.target, "Вы сыты", "#c8aa6e");
                        return;
                    }
                    gameState.gold -= 100;
                    gameState.hp = gameState.maxHp;
                    gameState.hunger = gameState.maxHunger; // Восстанавливаем голод на 100%
                    ui.updateStats();
                    game.save();
                    ui.showFloatText(event.target, "HP и Голод восстановлены!", "#34d399");

                    // Thomas Event Trigger
                    if (!gameState.npcStates) gameState.npcStates = {};
                    if (!gameState.npcStates.thomas_met) {
                        setTimeout(() => {
                            dialogue.start('thomas_intro');
                        }, 1000);
                    }
                } else {
                    ui.showFloatText(event.target, "Не хватает золота", "#ff5555");
                }
            },

            forestGather: function(event) {
                const isImmortal = gameState.effects && gameState.effects.immortality > Date.now();
                if (!isImmortal && gameState.hp < 5) {
                    ui.showFloatText(event.target, "Мало здоровья", "#ff5555");
                    return;
                }
                if (!isImmortal) {
                    const dmg = Math.floor(5 * game.getHungerDamageMultiplier());
                    gameState.hp -= dmg;
                }
                
                game.addXp(3);
                
                const isLuckyEffect = gameState.effects && gameState.effects.luck > Date.now();
                const luckBonus = (gameState.luck || 0) * 0.05;
                
                let count = Math.floor(Math.random() * 3) + 1;
                if (Math.random() < luckBonus) count++;
                if (isLuckyEffect) count *= 2;
                
                const loot = [];
                for(let i=0; i<count; i++) {
                    const r = Math.random();
                    if(r < 0.4) loot.push('wood');       
                    else if(r < 0.7) loot.push('stone'); 
                    else if(r < 0.9) loot.push('herbs'); 
                    else loot.push('mushrooms');         
                }
                
                const gained = {};
                loot.forEach(item => {
                    gameState[item] = (gameState[item] || 0) + 1;
                    gained[item] = (gained[item] || 0) + 1;
                });
                
                let text = "";
                const names = {wood:'Палка', stone:'Камень', herbs:'Трава', mushrooms:'Гриб'};
                
                Object.keys(gained).forEach(k => {
                    text += `+${gained[k]} ${names[k]} `;
                });
                
                ui.showFloatText(event.target, text || "Пусто...", "#a855f7");

                Object.keys(gained).forEach(k => {
                    quests.onEvent('gather', k, gained[k]);
                });
                
                // Chance to get measles
                disease.tryInfect();
                
                game.save();
                ui.updateStats();
            },

            forestHunt: function(event) {
                if (gameState.hp < 20) {
                    ui.showFloatText(event.target, "Слишком опасно...", "#ff5555");
                    return;
                }
                const dmg = Math.floor(20 * game.getHungerDamageMultiplier());
                gameState.hp -= dmg;
                game.addXp(20);
                
                const roll = Math.random();
                if (roll < 0.2) {
                    // Nothing / Escaped
                    ui.showFloatText(event.target, "Монстр сбежал...", "#777");
                } else if (roll < 0.7) {
                    // Win standard
                    const gold = Math.floor(Math.random() * 50) + 20;
                    gameState.gold += gold;
                    ui.showFloatText(event.target, `Победа! +${gold} Золота`, "#c8aa6e");
                } else if (roll < 0.9) {
                    // Win loot
                    const mushrooms = Math.floor(Math.random() * 5) + 2;
                    gameState.mushrooms += mushrooms;
                    ui.showFloatText(event.target, `Трофеи: +${mushrooms} Грибов`, "#a855f7");
                } else {
                    // Critical win / Chest
                    const gold = 100 + Math.floor(Math.random() * 100);
                    gameState.gold += gold;
                    ui.showFloatText(event.target, `ЛЕГЕНДАРНО! +${gold} Золота`, "#fbbf24");
                }
                
                game.save();
                ui.updateStats();
            }
        };

        // --- MARKET CONTROLLER ---
        const market = {
            currentCategory: 'tools',

            switchCategory: function(cat) {
                this.currentCategory = cat;
                document.querySelectorAll('#view-market .sub-tab').forEach(el => el.classList.remove('active'));
                const btn = document.getElementById(`tab-market-${cat}`);
                if(btn) btn.classList.add('active');

                document.getElementById('market-tools').classList.add('hidden');
                document.getElementById('market-weapons').classList.add('hidden');
                document.getElementById('market-armor').classList.add('hidden');
                document.getElementById('market-placeholder').classList.add('hidden');

                if (cat === 'tools') {
                    document.getElementById('market-tools').classList.remove('hidden');
                    // Hide sword for tools tab
                    const swordEl = document.getElementById('btn-buy-sword').parentElement;
                    if(swordEl) swordEl.style.display = 'none';
                    // Show others
                    ['rod','sickle','pickaxe','crossbow'].forEach(k => {
                        const el = document.getElementById(`btn-buy-${k}`).parentElement;
                        if(el) el.style.display = 'flex';
                    });
                    this.renderTools();
                } else if (cat === 'weapons') {
                    document.getElementById('market-weapons').classList.remove('hidden');
                } else if (cat === 'armor') {
                    document.getElementById('market-armor').classList.remove('hidden');
                } else if (cat === 'horses') {
                    document.getElementById('market-placeholder').classList.remove('hidden');
                }
            },

            categoriesBuilt: false,

            buildTradeCategories: function() {
                ui.buildMarketCategories();
            },

            resourcePrices: {
                // Продажа (покупка = x2)
                fish: 3,
                meat: 10,
                mushrooms: 15,
                bread: 6,
                eggs: 4,
                milk: 6,

                ore: 25,
                bronze: 50,
                silver: 80,

                wheat: 8,
                wood: 2,
                stone: 2,
                herbs: 6,
                leather: 60,

                wool: 8,
                rope: 10,
                cloth: 12
            },

            getResourcePrice: function(resType) {
                return this.resourcePrices[resType] || 0;
            },

            getToolPrice: function(toolKey) {
                const toolState = gameState.tools[toolKey];
                const base = TOOLS_DB[toolKey].baseCost;
                if (!toolState.owned) return base;
                return Math.floor(base * (toolState.level + 1) * 1.5);
            },

            renderTools: function() {
                ['rod', 'sickle', 'pickaxe', 'crossbow', 'sword'].forEach(key => {
                    const state = gameState.tools[key];
                    if (!state) return; // safety
                    const price = this.getToolPrice(key);
                    const btn = document.getElementById(`btn-buy-${key}`);
                    const lvlSpan = document.getElementById(`market-lvl-${key}`);
                    const priceSpan = document.getElementById(`price-${key}`);
                    
                    if(lvlSpan) lvlSpan.innerText = state.owned ? `Ур: ${state.level}` : `Не куплено`;
                    
                    if(btn && priceSpan) {
                         priceSpan.innerText = price;
                         if (!state.owned) {
                            btn.innerHTML = `<span id="price-${key}">${price}</span> <i class="fas fa-coins text-[10px]"></i>`;
                        } else {
                            btn.innerHTML = `Улучшить <span id="price-${key}">${price}</span> <i class="fas fa-coins text-[10px]"></i>`;
                        }
                        if (gameState.gold < price) btn.style.opacity = '0.5';
                        else btn.style.opacity = '1';
                    }

                    // Update tool icon to ensure SVG/FA consistency
                    const toolContainer = btn.closest('.panel');
                    if (toolContainer) {
                        const iconContainer = toolContainer.querySelector('.w-12.h-12');
                        if (iconContainer) {
                            iconContainer.innerHTML = ui.getIconHtml(TOOLS_DB[key].icon, 'w-6 h-6');
                        }
                    }
                });
            },

            buyOrUpgradeTool: function(key) {
                const price = this.getToolPrice(key);
                if (gameState.gold >= price) {
                    const nextWeight = !gameState.tools[key].owned ? (TOOL_WEIGHTS[key] || 0) : 0;
                    if (!game.hasWeightCapacity(nextWeight)) {
                        game.showWeightWarning(event.target);
                        return;
                    }
                    gameState.gold -= price;
                    if (!gameState.tools[key].owned) {
                        gameState.tools[key].owned = true;
                        gameState.tools[key].level = 1;
                        ui.showFloatText(event.target, "Куплено!", "#34d399");
                    } else {
                        gameState.tools[key].level++;
                        ui.showFloatText(event.target, "Улучшено!", "#34d399");
                    }
                    // Quest Progress
                    quests.onEvent('upgrade', key, 1);
                    
                    game.save();
                    ui.updateAll();
                } else {
                    ui.showFloatText(event.target, "Не хватает золота", "#ff5555");
                }
            },

            buySword: function(swordId) {
                const sword = SWORDS_DB[swordId];
                if (!sword) return;

                // Check if already have this sword
                if (gameState.currentSword === swordId) {
                    ui.showFloatText(event.target, "Уже куплено!", "#777");
                    return;
                }

                // Check cost
                if (sword.costType === 'gold') {
                    if (gameState.gold < sword.cost) {
                        ui.showFloatText(event.target, "Не хватает золота", "#ff5555");
                        return;
                    }
                    gameState.gold -= sword.cost;
                } else {
                    if (gameState.emeralds < sword.cost) {
                        ui.showFloatText(event.target, "Не хватает изумрудов", "#ff5555");
                        return;
                    }
                    gameState.emeralds -= sword.cost;
                }

                gameState.currentSword = swordId;
                gameState.damage = sword.damage;
                game.save();
                ui.updateStats();
                ui.showFloatText(event.target, `${sword.name} куплен!`, "#34d399");
            },

            buyArmor: function(armorId) {
                const armor = ARMOR_DB[armorId];
                if (!armor) return;

                // Check if already have this armor
                if (gameState.currentArmor === armorId) {
                    ui.showFloatText(event.target, "Уже куплено!", "#777");
                    return;
                }

                // Check cost
                if (armor.costType === 'gold') {
                    if (gameState.gold < armor.cost) {
                        ui.showFloatText(event.target, "Не хватает золота", "#ff5555");
                        return;
                    }
                    gameState.gold -= armor.cost;
                } else {
                    if (gameState.emeralds < armor.cost) {
                        ui.showFloatText(event.target, "Не хватает изумрудов", "#ff5555");
                        return;
                    }
                    gameState.emeralds -= armor.cost;
                }

                gameState.currentArmor = armorId;
                gameState.armor = armor.armor;
                game.save();
                ui.updateStats();
                ui.showFloatText(event.target, `${armor.name} куплена!`, "#34d399");
            },

            ensureWeightCapacity: function(extraWeight) {
                if (!game.hasWeightCapacity(extraWeight)) {
                    game.showWeightWarning(document.body);
                    return false;
                }
                return true;
            },

            ensureWeightCapacityForItem: function(itemKey, count = 1) {
                const extraWeight = (RESOURCE_WEIGHTS[itemKey] || 0) * count;
                return this.ensureWeightCapacity(extraWeight);
            },

            buyClothes: function(type, cost) {
                if (type === 'noble' && gameState.emeralds < cost) {
                    ui.showFloatText(event.target, "Не хватает изумрудов", "#ff5555");
                    return;
                }
                if (type !== 'noble' && gameState.gold < cost) {
                    ui.showFloatText(event.target, "Не хватает золота", "#ff5555");
                    return;
                }
                
                if (type === 'noble') {
                    gameState.emeralds -= cost;
                } else {
                    gameState.gold -= cost;
                }
                
                gameState.clothes = gameState.clothes || {};
                gameState.clothes[type] = true;
                game.save();
                ui.updateStats();
                ui.showFloatText(event.target, "Одежда куплена!", "#34d399");
                game.gainReputationForClothes(type, event.target);
            },

            tradeMode: 'sell',

            setMax: function(resType) {
                const count = gameState[resType] || 0;
                const input = document.getElementById(`trade-input-${resType}`);
                if(input) input.value = count > 0 ? count : 1;
            },

            sellFromInput: function(resType) {
                const input = document.getElementById(`trade-input-${resType}`);
                let amount = parseInt(input.value);
                if (isNaN(amount) || amount <= 0) return;
                this.sellResource(resType, amount);
            },

            buyFromInput: function(resType) {
                const input = document.getElementById(`trade-input-${resType}`);
                let amount = parseInt(input.value);
                if (isNaN(amount) || amount <= 0) return;
                this.buyResource(resType, amount);
            },

            getResourcePrice: function(resType) {
                return this.resourcePrices[resType] || 0;
            },

            buyResource: function(resType, amount) {
                const price = this.getResourcePrice(resType);
                if (price === 0) return;
                const totalCost = price * 2 * amount;
                if (amount <= 0) {
                    ui.showFloatText(event.target, "Введите количество", "#ff5555");
                    return;
                }
                if (gameState.gold >= totalCost) {
                    const extraWeight = (RESOURCE_WEIGHTS[resType] || 0) * amount;
                    if (!game.hasWeightCapacity(extraWeight)) {
                        game.showWeightWarning(event.target);
                        return;
                    }
                    gameState.gold -= totalCost;
                    gameState[resType] = (gameState[resType] || 0) + amount;
                    game.save();
                    ui.updateStats();
                    ui.showFloatText(event.target, `-${totalCost} Золота`, "#ff5555");
                } else {
                    ui.showFloatText(event.target, "Не хватает золота", "#ff5555");
                }
            },

            canAddWeight: function(resType, amount) {
                const extraWeight = (RESOURCE_WEIGHTS[resType] || 0) * amount;
                return game.hasWeightCapacity(extraWeight);
            },

            canAddTool: function(toolKey) {
                return game.hasWeightCapacity(TOOL_WEIGHTS[toolKey] || 0);
            },

            canAddWeight: function(resType, amount) {
                const extraWeight = (RESOURCE_WEIGHTS[resType] || 0) * amount;
                return game.hasWeightCapacity(extraWeight);
            },

            canAddTool: function(toolKey) {
                return game.hasWeightCapacity(TOOL_WEIGHTS[toolKey] || 0);
            },

            switchTradeMode: function(mode) {
                this.tradeMode = mode;
                const sellTab = document.getElementById('market-trade-sell');
                const buyTab = document.getElementById('market-trade-buy');
                if (sellTab && buyTab) {
                    sellTab.classList.toggle('active', mode === 'sell');
                    buyTab.classList.toggle('active', mode === 'buy');
                }

                const resourceList = Object.keys(RESOURCE_NAMES);
                resourceList.forEach(resource => {
                    const btn = document.getElementById(`btn-trade-${resource}`);
                    if (btn) {
                        if (mode === 'sell') {
                            btn.innerText = 'Продать';
                            btn.onclick = () => this.sellFromInput(resource);
                        } else {
                            btn.innerText = 'Купить';
                            btn.onclick = () => this.buyFromInput(resource);
                        }
                    }
                });
                this.updateTradePrices();
            },

            updateTradePrices: function() {
                const resourceList = Object.keys(RESOURCE_NAMES);
                resourceList.forEach(resource => {
                    const priceEl = document.getElementById(`price-${resource}`);
                    if (priceEl) {
                        const base = this.getResourcePrice(resource);
                        const price = this.tradeMode === 'buy' ? base * 2 : base;
                        priceEl.innerText = price;
                    }
                });
            },

            sellResource: function(resType, amount) {
                const price = this.getResourcePrice(resType);
                if (price === 0) return;

                const current = gameState[resType] || 0;
                if (amount === -1) amount = current;

                if (amount <= 0) {
                     ui.showFloatText(event.target, "Нечего продавать", "#ff5555");
                     return;
                }

                if (current >= amount) {
                    gameState[resType] -= amount;
                    const totalGain = amount * price;
                    gameState.gold += totalGain;
                    
                    // Quest Progress
                    quests.onEvent('sell', resType, amount);

                    game.save();
                    ui.updateStats();
                    ui.showFloatText(event.target, `+${totalGain} Золота`, "#c8aa6e");
                } else {
                    ui.showFloatText(event.target, "Не хватает ресурсов", "#ff5555");
                }
            }
        };

        // --- HOUSING CONTROLLER ---
        const housing = {
            buyPoorHouse: function() {
                if (gameState.emeralds >= 500) {
                    gameState.emeralds -= 500;
                    gameState.hasPoorHouse = true;
                    game.save();
                    ui.updateStats();
                    this.updateUI();
                    ui.showFloatText(event.target, "Дом куплен!", "#fbbf24");
                } else {
                    ui.showFloatText(event.target, "Нужно 500 изумрудов", "#ff5555");
                }
            },
            
            buyNobleHouse: function() {
                if (gameState.emeralds >= 10000) {
                    gameState.emeralds -= 10000;
                    gameState.hasNobleHouse = true;
                    game.save();
                    ui.updateStats();
                    this.updateUI();
                    ui.showFloatText(event.target, "Особняк куплен!", "#fbbf24");
                } else {
                    ui.showFloatText(event.target, "Нужно 10,000 изумрудов", "#ff5555");
                }
            },
            
            updateUI: function() {
                // Poor House
                const poorBuy = document.getElementById('poor-house-buy');
                const poorOwned = document.getElementById('poor-house-owned');
                if (poorBuy && poorOwned) {
                    if (gameState.hasPoorHouse) {
                        poorBuy.classList.add('hidden');
                        poorOwned.classList.remove('hidden');
                    } else {
                        poorBuy.classList.remove('hidden');
                        poorOwned.classList.add('hidden');
                    }
                }
                
                // Noble House
                const nobleBuy = document.getElementById('noble-house-buy');
                const nobleOwned = document.getElementById('noble-house-owned');
                if (nobleBuy && nobleOwned) {
                    if (gameState.hasNobleHouse) {
                        nobleBuy.classList.add('hidden');
                        nobleOwned.classList.remove('hidden');
                    } else {
                        nobleBuy.classList.remove('hidden');
                        nobleOwned.classList.add('hidden');
                    }
                }
            }
        };

        // --- VILLAGE CONTROLLER ---
        const village = {
            buyHouse: function() {
                if (gameState.emeralds >= 1000) {
                    gameState.emeralds -= 1000;
                    gameState.hasHouse = true;
                    game.save();
                    ui.updateStats();
                    this.updateUI();
                    ui.showFloatText(event.target, "Дом куплен!", "#fbbf24");
                    game.addReputation(6, event.target);
                } else {
                    ui.showFloatText(event.target, "Нужно 1000 изумрудов", "#ff5555");
                }
            },

            updateUI: function() {
                const houseOwned = document.getElementById('house-owned');
                const houseNotOwned = document.getElementById('house-not-owned');
                const houseStatus = document.getElementById('house-status');
                const pigLevel = document.getElementById('pig-pen-level');
                const meatCount = document.getElementById('meat-count');
                const measlesWarning = document.getElementById('measles-warning');
                const cureSection = document.getElementById('cure-measles-section');
                
                if (gameState.hasHouse) {
                    if(houseOwned) houseOwned.classList.remove('hidden');
                    if(houseNotOwned) houseNotOwned.classList.add('hidden');
                    if(houseStatus) houseStatus.innerText = "Ваш";
                    if(houseStatus) houseStatus.className = "text-[10px] text-green-400";
                } else {
                    if(houseOwned) houseOwned.classList.add('hidden');
                    if(houseNotOwned) houseNotOwned.classList.remove('hidden');
                    if(houseStatus) houseStatus.innerText = "Не куплен";
                    if(houseStatus) houseStatus.className = "text-[10px] text-red-400";
                }
                
                if(pigLevel) pigLevel.innerText = gameState.pigPenLevel || 0;
                if(meatCount) meatCount.innerText = gameState.meat || 0;
                
                if (gameState.hasMeasles) {
                    if(measlesWarning) measlesWarning.classList.remove('hidden');
                    if(cureSection) cureSection.classList.remove('hidden');
                } else {
                    if(measlesWarning) measlesWarning.classList.add('hidden');
                    if(cureSection) cureSection.classList.add('hidden');
                }
            },

            upgradePigPen: function() {
                const cost = (gameState.pigPenLevel + 1) * 100;
                if (gameState.gold >= cost) {
                    gameState.gold -= cost;
                    gameState.pigPenLevel++;
                    game.save();
                    ui.updateStats();
                    this.updateUI();
                    ui.showFloatText(event.target, "Свинарник улучшен!", "#ec4899");
                } else {
                    ui.showFloatText(event.target, "Не хватает золота", "#ff5555");
                }
            },
            
            upgradePigPen: function() {
                const cost = (gameState.pigPenLevel + 1) * 100;
                if (gameState.gold >= cost) {
                    gameState.gold -= cost;
                    gameState.pigPenLevel++;
                    game.save();
                    ui.updateStats();
                    this.updateUI();
                    ui.showFloatText(event.target, "Свинарник улучшен!", "#ec4899");
                } else {
                    ui.showFloatText(event.target, "Не хватает золота", "#ff5555");
                }
            },
            
            collectMeat: function() {
                if (gameState.pigPenLevel < 1) {
                    ui.showFloatText(event.target, "Сначала постройте свинарник", "#ff5555");
                    return;
                }
                
                const now = Date.now();
                const timePassed = now - (gameState.lastMeatCollect || 0);
                const hoursPass = timePassed / 3600000;
                const meatGain = Math.floor(hoursPass * gameState.pigPenLevel);
                
                if (meatGain > 0) {
                    const extraWeight = (RESOURCE_WEIGHTS.meat || 0) * meatGain;
                    if (!game.hasWeightCapacity(extraWeight)) {
                        game.showWeightWarning(event.target);
                        return;
                    }
                    gameState.meat = (gameState.meat || 0) + meatGain;
                    gameState.lastMeatCollect = now;
                    game.save();
                    this.updateUI();
                    ui.showFloatText(event.target, `+${meatGain} Мяса`, "#ec4899");
                } else {
                    ui.showFloatText(event.target, "Подождите ещё", "#777");
                }
            },
            
            buyBread: function(event) {
                if (gameState.gold >= 20) {
                    gameState.gold -= 20;
                    const hungerRestore = Math.floor(gameState.maxHunger * 0.2); // 20% от максимального голода
                    gameState.hunger = Math.min(gameState.maxHunger, gameState.hunger + hungerRestore);
                    game.save();
                    ui.updateStats();
                    ui.showFloatText(event.target, `+${hungerRestore} Сытость!`, "#fbbf24");
                } else {
                    ui.showFloatText(event.target, "Нужно 20 золота", "#ff5555");
                }
            },
            
            cureMeasles: function() {
                if (!gameState.hasMeasles) {
                    ui.showFloatText(event.target, "Вы здоровы", "#34d399");
                    return;
                }
                
                if (gameState.herbs >= 15 && gameState.mushrooms >= 10) {
                    gameState.herbs -= 15;
                    gameState.mushrooms -= 10;
                    gameState.hasMeasles = false;
                    game.save();
                    ui.updateStats();
                    this.updateUI();
                    ui.showFloatText(event.target, "Вы исцелены!", "#34d399");
                } else {
                    ui.showFloatText(event.target, "Нужно 15 трав и 10 грибов", "#ff5555");
                }
            },
            
            updateUI: function() {
                const houseOwned = document.getElementById('house-owned');
                const houseNotOwned = document.getElementById('house-not-owned');
                const houseStatus = document.getElementById('house-status');
                const pigLevel = document.getElementById('pig-pen-level');
                const meatCount = document.getElementById('meat-count');
                const measlesWarning = document.getElementById('measles-warning');
                const cureSection = document.getElementById('cure-measles-section');
                
                if (gameState.hasHouse) {
                    if(houseOwned) houseOwned.classList.remove('hidden');
                    if(houseNotOwned) houseNotOwned.classList.add('hidden');
                    if(houseStatus) houseStatus.innerText = "Ваш";
                    if(houseStatus) houseStatus.className = "text-[10px] text-green-400";
                } else {
                    if(houseOwned) houseOwned.classList.add('hidden');
                    if(houseNotOwned) houseNotOwned.classList.remove('hidden');
                    if(houseStatus) houseStatus.innerText = "Не куплен";
                    if(houseStatus) houseStatus.className = "text-[10px] text-red-400";
                }
                
                if(pigLevel) pigLevel.innerText = gameState.pigPenLevel || 0;
                if(meatCount) meatCount.innerText = gameState.meat || 0;
                
                if (gameState.hasMeasles) {
                    if(measlesWarning) measlesWarning.classList.remove('hidden');
                    if(cureSection) cureSection.classList.remove('hidden');
                } else {
                    if(measlesWarning) measlesWarning.classList.add('hidden');
                    if(cureSection) cureSection.classList.add('hidden');
                }
            }
        };

        // --- BULLETIN BOARD CONTROLLER ---
        const bulletin = {
            quests: {
                fish_delivery: { id: 'fish_delivery', title: 'Рыба для таверны', target: 'fish', count: 10, reward: { gold: 100, xp: 15 } },
                herbs_delivery: { id: 'herbs_delivery', title: 'Травы для лекаря', target: 'herbs', count: 8, reward: { gold: 80, xp: 10 } },
                ore_delivery: { id: 'ore_delivery', title: 'Руда для кузнеца', target: 'ore', count: 5, reward: { gold: 200, xp: 25 } }
            },
            
            acceptQuest: function(questId) {
                const quest = this.quests[questId];
                if (!quest) return;
                
                // Check if already have this quest
                if (hasStoryQuest('bulletin_' + questId)) {
                    ui.showFloatText(event.target, "Уже взято", "#ff5555");
                    return;
                }
                
                // Check if player has enough resources to complete immediately
                const hasResources = gameState[quest.target] >= quest.count;
                
                if (hasResources) {
                    // Complete immediately
                    gameState[quest.target] -= quest.count;
                    gameState.gold += quest.reward.gold;
                    game.addXp(quest.reward.xp);
                    game.save();
                    ui.updateStats();
                    ui.showFloatText(event.target, `+${quest.reward.gold} Золота +${quest.reward.xp} XP`, "#fbbf24");
                    game.addReputation(2, event.target);
                } else {
                    // Add as story quest
                    dialogue.addQuest(
                        'bulletin_' + questId,
                        quest.title,
                        `Принести ${quest.count} ${RESOURCE_NAMES[quest.target].name}`,
                        { type: 'gather', target: quest.target, count: quest.count },
                        quest.reward
                    );
                }
            }
        };

        // --- DISEASE SYSTEM ---
        const disease = {
            startTick: function() {
                setInterval(() => {
                    if (gameState.hasMeasles && gameState.hp > 1) {
                        const now = Date.now();
                        if (now - (gameState.lastMeaslesTick || 0) >= 20000) {
                            gameState.hp = Math.max(1, gameState.hp - 1);
                            gameState.lastMeaslesTick = now;
                            game.save();
                            ui.updateStats();
                        }
                    }
                }, 1000);
            },
            
            tryInfect: function() {
                // 5% chance to get measles in the forest
                if (!gameState.hasMeasles && Math.random() < 0.05) {
                    gameState.hasMeasles = true;
                    gameState.lastMeaslesTick = Date.now();
                    game.save();
                    ui.showFloatText(document.body, "Вы заразились Корью!", "#ef4444");
                    village.updateUI();
                }
            }
        };

        // --- SKILLS CONTROLLER ---
        const livestock = {
            animalPrices: {
                rabbit: 4000,
                chicken: 5000,
                pig: 10000,
                cow: 50000
            },
            feedPrices: {
                grain: 20,
                hay: 30,
                vegetables: 15
            },

            ensureHasHouse: function(anchor) {
                if (!gameState.hasHouse) {
                    ui.showFloatText(anchor || document.body, "Нужен дом с загоном", "#ff5555");
                    return false;
                }
                return true;
            },

            buyAnimal: function(animal) {
                const anchor = event && event.target ? event.target : document.body;
                if (!this.ensureHasHouse(anchor)) return;

                if (!gameState.livestock) gameState.livestock = { rabbit: false, chicken: false, pig: false, cow: false };
                if (gameState.livestock[animal]) {
                    ui.showFloatText(anchor, "У вас уже есть это животное", "#777");
                    return;
                }

                const price = this.animalPrices[animal];
                if (!price) return;

                if (gameState.gold < price) {
                    ui.showFloatText(anchor, "Не хватает золота", "#ff5555");
                    return;
                }

                gameState.gold -= price;
                gameState.livestock[animal] = true;
                game.save();
                ui.updateStats();
                ui.showFloatText(anchor, "Животное куплено!", "#34d399");
                game.addReputation(1, anchor);
            },

            buyFeed: function(feed) {
                const anchor = event && event.target ? event.target : document.body;
                if (!this.ensureHasHouse(anchor)) return;
                const price = this.feedPrices[feed];
                if (!price) return;

                if (gameState.gold < price) {
                    ui.showFloatText(anchor, "Не хватает золота", "#ff5555");
                    return;
                }

                if (!game.hasWeightCapacity(RESOURCE_WEIGHTS[feed] || 0)) {
                    game.showWeightWarning(anchor);
                    return;
                }

                gameState.gold -= price;
                gameState[feed] = (gameState[feed] || 0) + 1;
                game.save();
                ui.updateStats();
                ui.showFloatText(anchor, `Куплено: ${RESOURCE_NAMES[feed].name}`, "#34d399");
            }
        };

        // --- SKILLS CONTROLLER ---
        const skills = {
            upgrade: function(type) {
                if (gameState.skillPoints < 1) {
                    ui.showFloatText(event.target, "Нет жетонов", "#ff5555");
                    return;
                }
                
                if (type === 'hp') {
                    gameState.skillPoints--;
                    gameState.maxHp += 20;
                    gameState.hp += 20;
                    ui.showFloatText(event.target, "+20 Max HP", "#ef4444");
                } else if (type === 'luck') {
                    gameState.skillPoints--;
                    gameState.luck = (gameState.luck || 0) + 1;
                    ui.showFloatText(event.target, "+1 Удача", "#34d399");
                } else if (type === 'agility') {
                    gameState.skillPoints--;
                    gameState.agility = (gameState.agility || 0) + 1;
                    ui.showFloatText(event.target, "+1 Ловкость", "#3b82f6");
                }
                
                game.save();
                ui.updateStats();
            }
        };

        // --- CRAFTING & INVENTORY ---
        const crafting = {
            mode: 'inventory', 
            toggleMode: function() {
                const invUI = document.getElementById('ui-inventory');
                const craftUI = document.getElementById('ui-crafting');
                const btnText = document.getElementById('craft-btn-text');

                if (this.mode === 'inventory') {
                    this.mode = 'crafting';
                    invUI.classList.add('hidden');
                    craftUI.classList.remove('hidden');
                    btnText.innerText = 'Вернуться в рюкзак';
                } else {
                    this.mode = 'inventory';
                    invUI.classList.remove('hidden');
                    craftUI.classList.add('hidden');
                    btnText.innerText = 'Перейти к крафту';
                    inventory.render();
                }
            },
            switchCategory: function(cat) {
                document.querySelectorAll('#ui-crafting .sub-tab').forEach(el => el.classList.remove('active'));
                document.getElementById(`tab-craft-${cat}`).classList.add('active');
            },
            upgradeBag: function(event) {
                if (!gameState.recipes || !gameState.recipes.bag) {
                    ui.showFloatText(event.target, "Нужен рецепт сумки", "#ff5555");
                    return;
                }
                const cost = 3;
                if ((gameState.leather || 0) < cost || (gameState.wood || 0) < 2) {
                    ui.showFloatText(event.target, "Нужно 3 кожи и 2 палки", "#ff5555");
                    return;
                }
                gameState.leather -= cost;
                gameState.wood -= 2;
                gameState.bagLevel = (gameState.bagLevel || 0) + 1;
                game.save();
                ui.updateStats();
                inventory.render();
                ui.showFloatText(event.target, "+8 слотов", "#34d399");
            }
        };

        const inventory = {
            currentCategory: 'tools',
            switchCategory: function(cat) {
                this.currentCategory = cat;
                document.querySelectorAll('#ui-inventory .sub-tab').forEach(el => el.classList.remove('active'));
                document.getElementById(`tab-inv-${cat}`).classList.add('active');
                this.render();
            },

            getCategoryItems: function() {
                // Returns array of { kind: 'tool'|'resource'|'shoes', key, name, icon, count, weight, desc, level? }
                const items = [];

                if (this.currentCategory === 'tools') {
                    Object.keys(TOOLS_DB).forEach(key => {
                        const state = gameState.tools[key];
                        if (state && state.owned) {
                            const db = TOOLS_DB[key];
                            items.push({
                                kind: 'tool',
                                key,
                                name: db.name,
                                icon: db.icon,
                                level: state.level,
                                count: 1,
                                weight: TOOL_WEIGHTS[key] || 0,
                                desc: itemModal.getDescriptionForTool(key)
                            });
                        }
                    });
                }

                if (this.currentCategory === 'weapons') {
                    // For now: swords live in tools, but we still show sword here if owned
                    const key = 'sword';
                    const state = gameState.tools && gameState.tools[key];
                    if (state && state.owned) {
                        const db = TOOLS_DB[key];
                        items.push({
                            kind: 'tool',
                            key,
                            name: db.name,
                            icon: db.icon,
                            level: state.level,
                            count: 1,
                            weight: TOOL_WEIGHTS[key] || 0,
                            desc: itemModal.getDescriptionForTool(key)
                        });
                    }
                }

                if (this.currentCategory === 'other') {
                    const resList = Object.keys(RESOURCE_NAMES);
                    resList.forEach(key => {
                        const count = gameState[key] || 0;
                        if (count > 0) {
                            const def = RESOURCE_NAMES[key];
                            items.push({
                                kind: 'resource',
                                key,
                                name: def.name,
                                icon: def.icon,
                                count,
                                weight: (RESOURCE_WEIGHTS[key] || 0),
                                desc: itemModal.getDescriptionForResource(key)
                            });
                        }
                    });
                }

                if (this.currentCategory === 'armor') {
                    // Placeholder category (future)
                }

                if (this.currentCategory === 'potions') {
                    // Placeholder category (future)
                }

                return items;
            },

            render: function() {
                const grid = document.getElementById('inventory-grid');
                grid.innerHTML = '';

                const items = this.getCategoryItems();

                items.forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'inv-item aspect-square bg-[#1a1a1d] border border-[#c8aa6e] rounded flex flex-col items-center justify-center relative p-1';

                    const iconHtml = ui.getIconHtml(item.icon, 'text-xl mb-1 w-6 h-6 text-[#c8aa6e]');

                    el.innerHTML = `
                        ${iconHtml}
                        <span class="text-[8px] uppercase text-center leading-tight text-gray-400">${item.name}</span>
                        ${item.kind === 'tool' ? `<span class="absolute top-0 right-1 text-[8px] text-white font-bold">${item.level}</span>` : ''}
                        ${item.kind !== 'tool' ? `<span class="absolute top-0 right-1 text-[8px] text-white font-bold">${item.count}</span>` : ''}
                    `;
                    el.onclick = () => itemModal.open(item);
                    grid.appendChild(el);
                });

                // Capacity by bag slots
                const bagLevel = gameState.bagLevel || 0;
                const capacity = 4 + bagLevel * 8;
                const children = grid.children.length;
                for (let i = 0; i < Math.max(0, capacity - children); i++) {
                    grid.appendChild(this.createEmptySlot());
                }
            },

            createEmptySlot: function() {
                const el = document.createElement('div');
                el.className = 'aspect-square bg-[#111] border border-[#333] rounded';
                return el;
            }
        };

        // --- UI HANDLER ---
        const ui = {
            getIconHtml: function(iconName, extraClasses = '') {
                if (iconName && iconName.startsWith('icon-')) {
                    return `<svg class="icon-svg ${extraClasses}" viewBox="0 0 24 24"><use href="#${iconName}"></use></svg>`;
                }
                return `<i class="fas ${iconName} ${extraClasses}"></i>`;
            },

            openSettings: function() {
                ui.showFloatText(document.body, 'Скоро', '#777');
            },

            updateAll: function() {
                this.updateStats();
                this.updateJobs();
                this.updateLocations();
                this.updateUnconsciousUI();
                market.renderTools();
                ui.updateMarketCounts();
                if (document.getElementById('market-trade-sell')) {
                    market.switchTradeMode(market.tradeMode || 'sell');
                }
                market.updateTradePrices();
                if (crafting.mode === 'inventory' && !document.getElementById('view-character').classList.contains('hidden') && document.getElementById('ui-skills').classList.contains('hidden')) {
                    inventory.render();
                }
                if(router.currentTab === 'quests') quests.render();
            },

            updateMarketCounts: function() {
                Object.keys(RESOURCE_NAMES).forEach(key => {
                    const el = document.getElementById(`market-count-${key}`);
                    if (el) el.innerText = gameState[key] || 0;
                });
            },

            buildMarketCategories: function() {
                if (market.categoriesBuilt) return;
                const list = [
                    {
                        id: 'food',
                        title: 'Еда',
                        tone: 'amber',
                        items: ['fish', 'meat', 'mushrooms', 'bread', 'eggs', 'milk']
                    },
                    {
                        id: 'metals',
                        title: 'Металлы',
                        tone: 'slate',
                        items: ['ore', 'bronze', 'silver']
                    },
                    {
                        id: 'other',
                        title: 'Другое',
                        tone: 'emerald',
                        items: ['wheat', 'wood', 'stone', 'herbs', 'leather', 'wool', 'rope', 'cloth']
                    }
                ];

                const container = document.getElementById('market-trade-grid');
                if (!container) return;
                container.innerHTML = '';

                list.forEach(group => {
                    const section = document.createElement('div');
                    section.className = `col-span-2 panel p-3 rounded border-${group.tone}-900/30 bg-${group.tone}-900/10`;
                    section.innerHTML = `
                        <div class="flex items-center gap-2 text-[10px] text-[#c8aa6e] uppercase tracking-widest mb-2">
                            <i class="fas fa-layer-group"></i> ${group.title}
                        </div>
                        <div id="market-group-${group.id}" class="grid grid-cols-2 gap-3"></div>
                    `;
                    container.appendChild(section);

                    const groupGrid = section.querySelector(`#market-group-${group.id}`);
                    group.items.forEach(item => {
                        const def = RESOURCE_NAMES[item];
                        const card = document.createElement('div');
                        card.className = 'panel p-2 rounded flex flex-col items-center text-center border-[#333] bg-black/20';
                        card.innerHTML = `
                            <div class="w-6 h-6 flex items-center justify-center text-[#c8aa6e] mb-1">
                                ${ui.getIconHtml(def.icon, 'w-full h-full')}
                            </div>
                            <div class="text-xs text-[#e0e0e0]">${def.name}</div>
                            <div class="text-[10px] text-[#a0a0a0] mb-1"><span id="price-${item}">0</span> <i class="fas fa-coins"></i></div>
                            <div class="text-[10px] text-blue-300 mb-1">У вас: <span id="market-count-${item}">0</span></div>
                            <div class="flex gap-1 w-full mb-1">
                                <input id="trade-input-${item}" type="number" min="1" value="1" class="w-full bg-[#111] border border-[#333] text-center text-[10px] text-white rounded p-0 outline-none focus:border-[#c8aa6e]">
                                <button onclick="market.setMax('${item}')" class="w-auto px-2 bg-[#222] border border-[#444] rounded text-[10px] text-gray-400 hover:text-white">Max</button>
                            </div>
                            <button onclick="market.sellFromInput('${item}')" id="btn-trade-${item}" class="w-full bg-[#2c2c30] border border-[#c8aa6e] rounded text-[10px] py-1 text-[#c8aa6e] hover:bg-[#c8aa6e] hover:text-black transition-colors uppercase">Продать</button>
                        `;
                        groupGrid.appendChild(card);
                    });
                });
                market.categoriesBuilt = true;
                market.updateTradePrices();
                ui.updateMarketCounts();
                market.switchTradeMode(market.tradeMode || 'sell');
            },

            updateStats: function() {
                document.getElementById('gold-display').innerText = gameState.gold;
                document.getElementById('emerald-display').innerText = gameState.emeralds;
                document.getElementById('char-level').innerText = gameState.level;

                const playerIdEl = document.getElementById('player-id');
                if (playerIdEl) playerIdEl.innerText = gameState.playerId || "—";
                const playerNameEl = document.getElementById('player-name');
                if (playerNameEl) playerNameEl.innerText = gameState.playerName || "Странник";
                
                const bankDisplay = document.getElementById('bank-display');
                if(bankDisplay) bankDisplay.innerText = gameState.bankedGold;
                const bankMini = document.getElementById('bank-display-mini');
                if(bankMini) bankMini.innerText = gameState.bankedGold;
                const walletMini = document.getElementById('wallet-display');
                if(walletMini) walletMini.innerText = gameState.gold;
                
                document.getElementById('level-display-header').innerText = `Ур ${gameState.level}`;
                const percent = Math.min(100, (gameState.xp / gameState.xpToNextLevel) * 100);
                const charBar = document.getElementById('xp-bar');
                if (charBar) charBar.style.width = `${percent}%`;
                const headerBar = document.getElementById('header-xp-bar');
                if (headerBar) headerBar.style.width = `${percent}%`;
                const xpText = document.getElementById('xp-text');
                if (xpText) xpText.innerText = `${gameState.xp} / ${gameState.xpToNextLevel} XP`;
                const headerXpText = document.getElementById('header-xp-text');
                if (headerXpText) headerXpText.innerText = `${gameState.xp}/${gameState.xpToNextLevel}`;
                const remaining = Math.max(0, gameState.xpToNextLevel - gameState.xp);
                const xpRemElement = document.getElementById('xp-remaining');
                if(xpRemElement) xpRemElement.innerText = remaining;
                document.getElementById('header-hp-text').innerText = gameState.hp;
                const hpPercent = (gameState.hp / gameState.maxHp) * 100;
                document.getElementById('hp-bar').style.width = `${hpPercent}%`;
                document.getElementById('hp-text').innerText = `${gameState.hp} / ${gameState.maxHp}`;
                
                // Update hunger bar
                const hungerPercent = (gameState.hunger / gameState.maxHunger) * 100;
                const hungerBar = document.getElementById('hunger-bar');
                const hungerText = document.getElementById('hunger-text');
                if (hungerBar) hungerBar.style.width = `${hungerPercent}%`;
                if (hungerText) hungerText.innerText = `${gameState.hunger} / ${gameState.maxHunger}`;
                
                ui.updateMarketCounts();

                const weightText = document.getElementById('weight-text');
                const weightBar = document.getElementById('weight-bar');
                if (weightText && weightBar) {
                    const currentWeight = game.getCurrentWeight();
                    const capacity = game.getWeightCapacity();
                    weightText.innerText = `${currentWeight} / ${capacity} кг`;
                    weightBar.style.width = `${Math.min(100, (currentWeight / capacity) * 100)}%`;
                    weightBar.classList.toggle('bg-red-500', currentWeight >= capacity);
                }

                const repValue = Math.max(0, Math.min(100, gameState.reputation || 0));
                const repValueEl = document.getElementById('rep-value');
                const repBar = document.getElementById('rep-bar');
                const repRank = document.getElementById('rep-rank');
                if (repValueEl) repValueEl.innerText = repValue;
                if (repBar) repBar.style.width = `${repValue}%`;
                if (repRank) {
                    let rankText = 'Безымянный странник';
                    if (repValue >= 80) rankText = 'Герой королевства';
                    else if (repValue >= 60) rankText = 'Прославленный защитник';
                    else if (repValue >= 40) rankText = 'Почтенный гражданин';
                    else if (repValue >= 20) rankText = 'Добрый житель';
                    repRank.innerText = rankText;
                }

                if (gameState.hp <= 0) {
                    const now = Date.now();
                    if (gameState.unconsciousUntil && gameState.unconsciousUntil > now) {
                        // Already unconscious, keep timer running
                    } else if (gameState.unconsciousUntil && gameState.unconsciousUntil <= now) {
                        game.checkUnconscious();
                    } else {
                        game.knockOut();
                    }
                } else if (gameState.hp < 14) {
                    const cooldown = 2 * 60 * 1000;
                    const lastWarn = gameState.lowHpWarnedAt || 0;
                    if (Date.now() - lastWarn > cooldown) {
                        this.showLowHpWarning();
                    }
                } else {
                    const lowHpModal = document.getElementById('modal-lowhp');
                    if (lowHpModal && lowHpModal.classList.contains('open')) {
                        lowHpModal.classList.remove('open');
                    }
                }
                
                // Check hunger level
                if (gameState.hunger <= 0) {
                    const cooldown = 2 * 60 * 1000;
                    const lastWarn = gameState.lastHungerWarning || 0;
                    if (Date.now() - lastWarn > cooldown) {
                        this.showHungerWarning();
                    }
                } else {
                    const hungerModal = document.getElementById('modal-hunger');
                    if (hungerModal && hungerModal.classList.contains('open')) {
                        hungerModal.classList.remove('open');
                    }
                }
            },

            updateJobs: function() {
                const portReward = game.getJobReward('port');
                this.updateJobButton('port', 'rod', 0);
                document.getElementById('reward-port').innerText = `${portReward.gold} Рыбы`; 
                
                // Loader job visibility (unlocked by Alex)
                const loaderJob = document.getElementById('job-loader');
                if (loaderJob) {
                    if (gameState.npcStates && gameState.npcStates.alex_job_unlocked) {
                        loaderJob.classList.remove('hidden');
                    } else {
                        loaderJob.classList.add('hidden');
                    }
                }
                
                const fieldReward = game.getJobReward('field');
                this.updateJobButton('field', 'sickle', 5);
                document.getElementById('reward-field').innerText = `${fieldReward.gold} Пшеницы`;
                const mineReward = game.getJobReward('mine');
                this.updateJobButton('mine', 'pickaxe', 15);
                document.getElementById('reward-mine').innerText = `${mineReward.gold} Руды`;
                this.updateJobButton('hunter', 'crossbow', 30);

                // Update Skills UI
                const spEl = document.getElementById('skill-points-display');
                if(spEl) spEl.innerText = gameState.skillPoints || 0;
                const bagLevelEl = document.getElementById('bag-level-display');
                if (bagLevelEl) bagLevelEl.innerText = gameState.bagLevel || 0;
                const luckEl = document.getElementById('luck-display');
                if(luckEl) luckEl.innerText = gameState.luck || 0;
                const agilityEl = document.getElementById('agility-display');
                if(agilityEl) agilityEl.innerText = gameState.agility || 0;
            },

            switchCharTab: function(tab) {
                document.getElementById('btn-tab-inv').className = "flex-1 bg-[#1a1a1d] border border-[#333] text-[#777] py-1 rounded text-xs uppercase font-serif transition-colors";
                document.getElementById('btn-tab-skills').className = "flex-1 bg-[#1a1a1d] border border-[#333] text-[#777] py-1 rounded text-xs uppercase font-serif transition-colors";
                
                document.getElementById(`btn-tab-${tab === 'inventory' ? 'inv' : 'skills'}`).className = "flex-1 bg-[#2c2c30] border border-[#c8aa6e] text-[#c8aa6e] py-1 rounded text-xs uppercase font-serif transition-colors";
                
                document.getElementById('ui-inventory').classList.add('hidden');
                document.getElementById('ui-crafting').classList.add('hidden');
                document.getElementById('ui-skills').classList.add('hidden');
                
                if (tab === 'inventory') {
                    // Reset crafting mode when switching tabs
                    crafting.mode = 'inventory';
                    document.getElementById('ui-inventory').classList.remove('hidden');
                    document.getElementById('craft-btn-text').innerText = 'Перейти к крафту';
                    inventory.render();
                } else {
                    document.getElementById('ui-skills').classList.remove('hidden');
                }
            },

            updateJobButton: function(jobId, toolId, lvlReq) {
                const btn = document.getElementById(`btn-work-${jobId}`);
                const info = document.getElementById(`job-info-${jobId}`);
                const container = document.getElementById(`job-${jobId}`);
                const toolOwned = gameState.tools[toolId].owned;
                const levelMet = gameState.level >= lvlReq;
                if (container) {
                     if (levelMet) container.classList.remove('opacity-50');
                     else container.classList.add('opacity-50');
                }
                if (!levelMet) {
                    btn.disabled = true;
                    btn.innerHTML = `<i class="fas fa-lock text-xs"></i> Требуется Уровень ${lvlReq}`;
                } else if (!toolOwned) {
                    btn.disabled = false;
                    btn.innerHTML = `<i class="fas fa-shopping-cart text-xs"></i> Требуется ${TOOLS_DB[toolId].name}`;
                } else {
                    btn.disabled = false;
                    let actionName = 'Работать';
                    let icon = 'fa-hammer';
                    if(jobId === 'port') { actionName = 'Рыбачить'; icon = 'fa-fish'; }
                    else if(jobId === 'field') { actionName = 'Собрать'; icon = 'fa-seedling'; }
                    else if(jobId === 'mine') { actionName = 'Добывать'; icon = 'fa-hammer'; }
                    else if(jobId === 'hunter') { actionName = 'Охотиться'; icon = 'fa-crosshairs'; }
                    btn.innerHTML = `<i class="fas ${icon} mr-2"></i> ${actionName}`;
                }
                if(info) {
                    if(toolOwned) info.innerHTML = `<span class="text-green-500"><i class="fas fa-check"></i> ${TOOLS_DB[toolId].name} (Ур ${gameState.tools[toolId].level})</span>`;
                    else info.innerHTML = `Требуется: ${TOOLS_DB[toolId].name}`;
                }
            },
            
            showFloatText: function(element, text, color) {
                const rect = element.getBoundingClientRect();
                const floatEl = document.createElement('div');
                floatEl.className = 'floating-text';
                floatEl.innerText = text;
                floatEl.style.color = color;
                floatEl.style.left = (rect.left + rect.width / 2) + 'px';
                floatEl.style.top = (rect.top) + 'px';
                document.body.appendChild(floatEl);
                setTimeout(() => { floatEl.remove(); }, 1000);
            },

            updateLocations: function() {
                // Tavern Brawl Timer
                const brawlTimerEl = document.getElementById('brawl-timer');
                const brawlBtn = document.getElementById('btn-brawl');
                if (brawlTimerEl && brawlBtn) {
                    const now = Date.now();
                    const last = gameState.lastBrawlTime || 0;
                    const cooldown = 3600000;
                    if (now - last < cooldown) {
                        const left = Math.ceil((cooldown - (now - last)) / 60000);
                        brawlTimerEl.innerText = `${left} мин`;
                        brawlTimerEl.className = "text-gray-500 font-mono";
                        brawlBtn.disabled = true;
                        brawlBtn.classList.add('opacity-50');
                        brawlBtn.innerText = "Отдых...";
                    } else {
                        brawlTimerEl.innerText = "Доступно";
                        brawlTimerEl.className = "text-[#c8aa6e] font-mono";
                        brawlBtn.disabled = false;
                        brawlBtn.classList.remove('opacity-50');
                        brawlBtn.innerHTML = "Выйти на бой";
                    }
                }

                // Rent Logic
                const statusEl = document.getElementById('rent-status');
                const btn = document.getElementById('btn-rent-room');
                if (gameState.rentExpiry > new Date().getTime()) {
                    // Logic here if needed
                }

                // Dark Forest Lock Logic
                const forestBtn = document.getElementById('btn-loc-forest');
                const forestDesc = document.getElementById('forest-desc');
                const forestIcon = document.getElementById('forest-lock-icon');
                
                if (forestBtn && forestDesc && forestIcon) {
                    if (gameState.level < 5) {
                        forestBtn.onclick = function() { ui.showFloatText(forestBtn, "Требуется Уровень 5", "#ff5555"); };
                        forestBtn.classList.add('opacity-50', 'grayscale');
                        forestBtn.classList.remove('hover:border-[#c8aa6e]');
                        forestDesc.innerText = "Требуется Уровень 5";
                        forestDesc.className = "text-xs text-red-400";
                        forestIcon.className = "fas fa-lock text-red-500 z-10";
                    } else {
                        forestBtn.onclick = function() { router.navigate('dark-forest'); };
                        forestBtn.classList.remove('opacity-50', 'grayscale');
                        forestBtn.classList.add('hover:border-[#c8aa6e]');
                        forestDesc.innerText = "Опасность и редкие травы";
                        forestDesc.className = "text-xs text-gray-300";
                        forestIcon.className = "fas fa-chevron-right text-gray-400 z-10";
                    }
                }

                // Training Camp Lock Logic
                const campBtn = document.getElementById('btn-loc-camp');
                const campDesc = document.getElementById('camp-desc');
                const campIcon = document.getElementById('camp-lock-icon');

                if (campBtn && campDesc && campIcon) {
                    if (gameState.level < 15) {
                         campBtn.onclick = function() { ui.showFloatText(campBtn, "Требуется Уровень 15", "#ff5555"); };
                         campBtn.classList.add('opacity-50', 'grayscale');
                         campBtn.classList.remove('hover:border-[#c8aa6e]');
                         campDesc.innerText = "Требуется Уровень 15";
                         campDesc.className = "text-xs text-red-400";
                         campIcon.className = "fas fa-lock text-red-500 z-10";
                    } else {
                         campBtn.onclick = function() { router.navigate('training-camp'); };
                         campBtn.classList.remove('opacity-50', 'grayscale');
                         campBtn.classList.add('hover:border-[#c8aa6e]');
                         campDesc.innerText = "Путь воина";
                         campDesc.className = "text-xs text-red-300";
                         campIcon.className = "fas fa-chevron-right text-gray-400 z-10";
                    }
                }

                // Military Fortress Logic
                const fortressBtn = document.getElementById('btn-loc-fortress');
                const fortressDesc = document.getElementById('fortress-desc');
                const fortressIcon = document.getElementById('fortress-lock-icon');
                const trained = !!(gameState.npcStates && gameState.npcStates.campTrained);

                if (fortressBtn && fortressDesc && fortressIcon) {
                    if (!trained) {
                        fortressBtn.onclick = function() {
                            dialogue.start('fortress_guard');
                        };
                        fortressBtn.classList.add('opacity-60');
                        fortressDesc.innerText = "Нужно пройти обучение";
                        fortressDesc.className = "text-[9px] text-slate-500 text-center mt-0.5";
                        fortressIcon.className = "fas fa-lock text-slate-500/70 text-[10px]";
                    } else {
                        fortressBtn.onclick = function() { router.navigate('military-fortress'); };
                        fortressBtn.classList.remove('opacity-60');
                        fortressDesc.innerText = "Казармы и приказы";
                        fortressDesc.className = "text-[9px] text-slate-300/60 text-center mt-0.5";
                        fortressIcon.className = "fas fa-chevron-right text-slate-300/70 text-[10px]";
                    }
                }

                // Refugee Camp Logic
                const refBtn = document.getElementById('btn-loc-refugee');
                const refDesc = document.getElementById('refugee-desc');
                const refIcon = document.getElementById('refugee-lock-icon');
                
                if (refBtn && refDesc && refIcon) {
                    if (gameState.npcStates && gameState.npcStates.thomas_met) {
                        refBtn.classList.remove('opacity-60');
                        refBtn.onclick = function() { router.navigate('refugee-camp'); };
                        refDesc.innerText = "Убежище изгоев";
                        refDesc.className = "text-xs text-gray-400";
                        refIcon.className = "fas fa-chevron-right text-gray-400 z-10";
                    } else {
                        refBtn.classList.add('opacity-60');
                        refBtn.onclick = function() { ui.showFloatText(refBtn, "Закрыто", "#777"); };
                        refDesc.innerText = "Тайное место";
                        refDesc.className = "text-xs text-gray-500";
                        refIcon.className = "fas fa-lock text-gray-600 z-10";
                    }
                }
            },

            showDailyModal: function() {
                const daysContainer = document.getElementById('daily-days-container');
                daysContainer.innerHTML = '';
                const streak = gameState.dailyStreak;
                const rewards = [5, 10, 15, 20, 30];
                rewards.forEach((amt, idx) => {
                    const dayNum = idx + 1;
                    const isCurrent = (streak > 5 && idx === 4) || (streak === dayNum);
                    const isPassed = streak > dayNum;
                    let bgClass = 'bg-[#111] border-gray-700 text-gray-500';
                    if (isPassed) bgClass = 'bg-emerald-900 border-emerald-700 text-emerald-400';
                    if (isCurrent) bgClass = 'bg-[#c8aa6e] border-yellow-500 text-black font-bold scale-110 shadow-lg';
                    const el = document.createElement('div');
                    el.className = `w-10 h-12 rounded border flex flex-col items-center justify-center text-[10px] ${bgClass}`;
                    el.innerHTML = `<span>Д${dayNum}</span><span class="${isCurrent ? 'text-black' : (isPassed ? 'text-emerald-400' : 'text-emerald-700')}">${amt}</span>`;
                    daysContainer.appendChild(el);
                });
                let todayReward = 30;
                if (streak <= 4) todayReward = rewards[streak-1];
                document.getElementById('daily-amount').innerText = todayReward;
                document.getElementById('modal-daily').classList.add('open');
            },

            updateUnconsciousUI: function() {
                const modal = document.getElementById('modal-unconscious');
                if (!modal) return;
                const now = Date.now();
                const active = gameState.unconsciousUntil && gameState.unconsciousUntil > now;

                if (active) {
                    modal.classList.add('open');
                    document.body.classList.add('unconscious');
                    this.updateTimerVisuals(); // Update immediately to prevent "10:00" flash
                } else {
                    modal.classList.remove('open');
                    document.body.classList.remove('unconscious');
                }
            },

            updateTimerVisuals: function() {
                if (gameState.unconsciousUntil && gameState.unconsciousUntil > Date.now()) {
                    const remaining = Math.max(0, Math.floor((gameState.unconsciousUntil - Date.now()) / 1000));
                    const minutes = Math.floor(remaining / 60);
                    const seconds = remaining % 60;
                    const timerEl = document.getElementById('unconscious-timer');
                    if (timerEl) {
                        timerEl.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                    }
                }
            },

            showLowHpWarning: function() {
                const modal = document.getElementById('modal-lowhp');
                if (!modal) return;
                if (gameState.unconsciousUntil && gameState.unconsciousUntil > Date.now()) return;
                if (modal.classList.contains('open')) return;
                modal.classList.add('open');
                gameState.lowHpWarnedAt = Date.now();
                game.save();
            },

            dismissLowHpWarning: function() {
                const modal = document.getElementById('modal-lowhp');
                if (modal) modal.classList.remove('open');
            },

            showHungerWarning: function() {
                const modal = document.getElementById('modal-hunger');
                if (!modal) return;
                if (modal.classList.contains('open')) return;
                modal.classList.add('open');
                gameState.lastHungerWarning = Date.now();
                game.save();
            },

            dismissHungerWarning: function() {
                const modal = document.getElementById('modal-hunger');
                if (modal) modal.classList.remove('open');
            },

            maybeTriggerTreasuryPouch: function() {
                if (gameState.treasuryPouchResolved) return;
                if (gameState.level < 3) return;
                if (gameState.npcStates && gameState.npcStates.treasuryPouchSeen) return;
                if (Math.random() < 0.35) {
                    if (!gameState.npcStates) gameState.npcStates = {};
                    gameState.npcStates.treasuryPouchSeen = true;
                    game.save();
                    setTimeout(() => {
                        ui.showTreasuryPouch();
                    }, 400);
                }
            },

            maybeTriggerBookhousePouch: function() {
                if (gameState.bookhousePouchResolved) return;
                if (gameState.level < 5) return;
                if (gameState.npcStates && gameState.npcStates.bookhousePouchSeen) return;
                if (Math.random() < 0.35) {
                    if (!gameState.npcStates) gameState.npcStates = {};
                    gameState.npcStates.bookhousePouchSeen = true;
                    game.save();
                    setTimeout(() => {
                        ui.showBookhousePouch();
                    }, 400);
                }
            },

            openRepInfo: function() {
                const modal = document.getElementById('modal-reputation');
                if (modal) modal.classList.add('open');
            },

            closeRepInfo: function() {
                const modal = document.getElementById('modal-reputation');
                if (modal) modal.classList.remove('open');
            },

            showTreasuryPouch: function() {
                const modal = document.getElementById('modal-treasury-pouch');
                if (modal) modal.classList.add('open');
            },

            resolveTreasuryPouch: function(choice) {
                const modal = document.getElementById('modal-treasury-pouch');
                if (modal) modal.classList.remove('open');
                if (gameState.treasuryPouchResolved) return;

                if (choice === 'return') {
                    game.addReputation(3, document.body);
                    ui.showFloatText(document.body, "+3 Репутации", "#34d399");
                } else {
                    gameState.gold += 1000;
                    game.addReputation(-5, document.body);
                    ui.showFloatText(document.body, "+1000 Золота", "#fbbf24");
                }

                gameState.treasuryPouchResolved = true;
                game.save();
                ui.updateStats();
            },

            showBookhousePouch: function() {
                const modal = document.getElementById('modal-bookhouse-pouch');
                if (modal) modal.classList.add('open');
            },

            resolveBookhousePouch: function(choice) {
                const modal = document.getElementById('modal-bookhouse-pouch');
                if (modal) modal.classList.remove('open');
                if (gameState.bookhousePouchResolved) return;

                if (choice === 'return') {
                    game.addReputation(3, document.body);
                    ui.showFloatText(document.body, "+3 Репутации", "#34d399");
                } else {
                    gameState.emeralds += 10;
                    game.addReputation(-5, document.body);
                    ui.showFloatText(document.body, "+10 Изумрудов", "#34d399");
                }

                gameState.bookhousePouchResolved = true;
                game.save();
                ui.updateStats();
            }
        };

        const itemModal = {
            open: function(item) {
                const modal = document.getElementById('modal-item');
                if (!modal) return;

                const iconEl = document.getElementById('item-modal-icon');
                const nameEl = document.getElementById('item-modal-name');
                const descEl = document.getElementById('item-modal-desc');
                const weightEl = document.getElementById('item-modal-weight');
                const countEl = document.getElementById('item-modal-count');

                iconEl.className = 'w-16 h-16 flex items-center justify-center text-[#c8aa6e] mx-auto';
                iconEl.innerHTML = ui.getIconHtml(item.icon, 'w-10 h-10');

                nameEl.innerText = item.name;
                descEl.innerText = item.desc || '—';

                if (item.kind === 'tool') {
                    countEl.innerText = `Уровень: ${item.level}`;
                    weightEl.innerText = `${(item.weight || 0).toFixed(1)} кг`;
                } else {
                    const totalW = (item.weight || 0) * (item.count || 0);
                    countEl.innerText = `Количество: ${item.count}`;
                    weightEl.innerText = `${(item.weight || 0).toFixed(1)} кг/шт • ${(totalW).toFixed(1)} кг всего`;
                }

                modal.classList.add('open');
            },

            close: function() {
                const modal = document.getElementById('modal-item');
                if (modal) modal.classList.remove('open');
            },

            getDescriptionForTool: function(key) {
                const map = {
                    rod: 'Удочка нужна для работы в порту. Чем выше уровень — тем больше добыча.',
                    sickle: 'Серп нужен для работы на пшеничном поле.',
                    pickaxe: 'Кирка нужна для добычи руды в шахте. В шахте есть шанс найти изумруд.',
                    crossbow: 'Арбалет нужен для охоты и добычи кожи.',
                    sword: 'Меч нужен для опасных дел и защиты. Некоторые люди не разговаривают без оружия.'
                };
                return map[key] || 'Инструмент для приключений.';
            },

            getDescriptionForResource: function(key) {
                const map = {
                    fish: 'Рыба — еда и товар. Можно продать на рынке или использовать в заданиях.',
                    meat: 'Мясо — питательная еда. Можно продать на рынке и использовать в рецептах.',
                    mushrooms: 'Грибы — редкий ингредиент для зелий и сделок.',
                    bread: 'Хлеб — простая еда. Легко продать или хранить в дорогу.',
                    eggs: 'Яйца — еда и товар. Нужны в хозяйстве и торговле.',
                    milk: 'Молоко — еда и товар. Тяжелее других продуктов.',
                    ore: 'Руда — металл для крафта и заказов кузнеца.',
                    bronze: 'Бронза — ценный металл. Покупают и продают на рынке.',
                    silver: 'Серебро — редкий металл высокой ценности.',
                    wheat: 'Пшеница — урожай с поля. Используется в торговле и быту.',
                    wood: 'Палки — простой материал для крафта.',
                    stone: 'Камни — материал для ремесла.',
                    herbs: 'Травы — важный ингредиент для лечения и зелий.',
                    leather: 'Кожа — ценный ресурс для брони и сумок.',
                    grain: 'Зерно — корм для куриц.',
                    hay: 'Сено — корм для коров.',
                    vegetables: 'Овощи — корм для кроликов и свиней.',
                    wool: 'Шерсть — полезный материал для ремесла и торговли. Мягкая, но ценится у портных.',
                    rope: 'Верёвка — универсальный расходник. Нужна в хозяйстве, крафте и для привязи.',
                    cloth: 'Ткань — основа одежды и сумок. Хорошо продаётся на рынке.'
                };
                return map[key] || 'Ресурс.';
            }
        };

        // --- ROUTER ---
        const router = {
            currentTab: 'map',
            switchTab: function(tabId) {
                this.currentTab = tabId;
                document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
                const activeNav = document.getElementById(`nav-${tabId}`);
                if(activeNav) activeNav.classList.add('active');
                document.querySelectorAll('section').forEach(el => el.classList.add('hidden'));
                const view = document.getElementById(`view-${tabId}`);
                if(view) view.classList.remove('hidden');
                if (tabId === 'map') {
                    document.getElementById('view-jobs').classList.add('hidden');
                    document.getElementById('view-town-square').classList.add('hidden');
                    document.getElementById('view-tavern').classList.add('hidden');
                    document.getElementById('view-treasury').classList.add('hidden');
                    document.getElementById('view-dark-forest').classList.add('hidden');
                    document.getElementById('view-map').classList.remove('hidden');
                }
                if (tabId === 'market') {
                    market.switchCategory('tools');
                    market.buildTradeCategories();
                    ui.updateAll();
                }
                if (tabId === 'character') {
                    if (crafting.mode === 'inventory') inventory.render();
                }
                if (tabId === 'quests') {
                    quests.render();
                }
            },
            navigate: function(screenId) {
                // Track action for hunger system (only for location changes, not UI tabs)
                const locationScreens = ['jobs', 'town-square', 'tavern', 'treasury', 'dark-forest', 
                    'training-camp', 'military-fortress', 'village', 'healer', 'bookhouse', 
                    'royal-castle', 'poor-district', 'noble-quarter', 'refugee-camp', 
                    'tailor', 'shoemaker', 'livestock-trader', 'bulletin'];
                
                if (locationScreens.includes(screenId)) {
                    game.trackAction();
                }
                
                document.getElementById('view-map').classList.add('hidden');
                document.getElementById('view-jobs').classList.add('hidden');
                document.getElementById('view-town-square').classList.add('hidden');
                document.getElementById('view-tavern').classList.add('hidden');
                document.getElementById('view-treasury').classList.add('hidden');
                document.getElementById('view-dark-forest').classList.add('hidden');
                const trainingCamp = document.getElementById('view-training-camp');
                if (trainingCamp) trainingCamp.classList.add('hidden');
                const fortressView = document.getElementById('view-military-fortress');
                if (fortressView) fortressView.classList.add('hidden');
                const villageView = document.getElementById('view-village');
                if (villageView) villageView.classList.add('hidden');
                const healerView = document.getElementById('view-healer');
                if (healerView) healerView.classList.add('hidden');
                const bookHouseView = document.getElementById('view-bookhouse');
                if (bookHouseView) bookHouseView.classList.add('hidden');
                const bulletinView = document.getElementById('view-bulletin');
                if (bulletinView) bulletinView.classList.add('hidden');
                const castleView = document.getElementById('view-royal-castle');
                if (castleView) castleView.classList.add('hidden');
                const poorView = document.getElementById('view-poor-district');
                if (poorView) poorView.classList.add('hidden');
                const nobleView = document.getElementById('view-noble-quarter');
                if (nobleView) nobleView.classList.add('hidden');
                const refugeeView = document.getElementById('view-refugee-camp');
                if (refugeeView) refugeeView.classList.add('hidden');
                const tailorView = document.getElementById('view-tailor');
                if (tailorView) tailorView.classList.add('hidden');
                const shoemakerView = document.getElementById('view-shoemaker');
                if (shoemakerView) shoemakerView.classList.add('hidden');
                const livestockView = document.getElementById('view-livestock-trader');
                if (livestockView) livestockView.classList.add('hidden');
                
                const target = document.getElementById(`view-${screenId}`);
                if (target) target.classList.remove('hidden');
                if(screenId === 'jobs') ui.updateJobs();
                if(screenId === 'market' || screenId === 'treasury' || screenId === 'healer' || screenId === 'bookhouse') {
                    ui.updateAll();
                    if (screenId === 'market') {
                        market.switchTradeMode(market.tradeMode || 'sell');
                    }
                }
                if (screenId === 'livestock-trader') {
                    ui.updateAll();
                }
                if(screenId === 'poor-district' || screenId === 'noble-quarter') housing.updateUI();
                if (screenId === 'noble-quarter') {
                    if (!gameState.clothes || !gameState.clothes.peasant) {
                        dialogue.start('noble_guard');
                        router.navigate('map');
                        ui.showFloatText(document.body, "Нужна одежда крестьянина", "#fbbf24");
                        return;
                    }
                    quests.onEvent('visit', 'noble-quarter', 1);
                    // Trigger quest completion if active
                    quests.onEvent('visit', 'noble-quarter', 1);
                }
                if(screenId === 'village') {
                    village.updateUI();
                    if (!gameState.npcStates) gameState.npcStates = {};
                    if (!gameState.npcStates.villageBanditsDone && Math.random() < 0.35) {
                        gameState.npcStates.villageBanditsTriggered = true;
                        setTimeout(() => {
                            dialogue.start('bandits_village');
                        }, 400);
                    }
                }

                if (screenId === 'treasury') {
                    ui.maybeTriggerTreasuryPouch();
                }
                if (screenId === 'bookhouse') {
                    ui.maybeTriggerBookhousePouch();
                }
            }
        };
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {

            // Apply location header images (same as map cards)
            const HERO_HEADER_IMAGES = {
                'jobs': 'https://i.postimg.cc/zvrrJHQg/IMG-4559.jpg',
                'town-square': 'https://i.postimg.cc/BnPztnfV/IMG-4542.jpg',
                'tavern': 'https://i.postimg.cc/kGckq181/IMG-4560.jpg',
                'treasury': 'https://i.postimg.cc/hvS5yLws/IMG-4561.jpg',
                'village': 'https://i.postimg.cc/P5BFss9w/IMG-4562.jpg',
                'dark-forest': 'https://i.postimg.cc/kGXTFn6F/IMG-4563.jpg',
                'healer': 'https://i.postimg.cc/rpXgZGRd/IMG-4564.jpg',
                'noble-quarter': 'https://i.postimg.cc/hv51LVqc/IMG-4565.jpg',
                'poor-district': 'https://i.postimg.cc/B6hT32bL/IMG-4566.jpg',
                'royal-castle': 'https://i.postimg.cc/JnqyJXkK/IMG-4567.jpg',
                'refugee-camp': 'https://i.postimg.cc/d3CV6T7L/IMG-4568.jpg',
                'livestock-trader': 'https://i.postimg.cc/zvw13wHX/IMG-4569.jpg',
                'training-camp': 'https://i.postimg.cc/C1D36CNf/IMG-4570.jpg',
                'military-fortress': 'https://i.postimg.cc/Ss0582pT/IMG-4571.jpg'
            };

            const applyHeroHeaderImages = () => {
                Object.entries(HERO_HEADER_IMAGES).forEach(([screenId, url]) => {
                    const sections = document.querySelectorAll(`#view-${screenId}`);
                    sections.forEach(section => {
                        const header = section.firstElementChild;
                        if (!header || !(header instanceof HTMLElement)) return;
                        // Only apply to the top header blocks (they are always the first child)
                        header.classList.add('loc-hero');
                        header.style.setProperty('--hero-img', `url('${url}')`);
                    });
                });
            };
            applyHeroHeaderImages();

            // Enhance router.switchTab to call updateLocations
            const originalSwitchTab = router.switchTab;
            router.switchTab = function(tabId) {
                originalSwitchTab.call(router, tabId);
                if (tabId === 'map') {
                    ui.updateLocations();
                }
            };

            // Enhance game.levelUp to call updateLocations
            const originalLevelUp = game.levelUp;
            game.levelUp = function() {
                originalLevelUp.call(game);
                ui.updateLocations();
            };

            game.init();
            router.switchTab('map');
            
            // Start disease tick
            disease.startTick();

            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) {
                    game.checkUnconscious();
                    ui.updateUnconsciousUI();
                }
            });

            setInterval(() => {
                game.checkUnconscious();
                // We don't need to call updateUnconsciousUI constantly, just the timer text
                if (gameState.unconsciousUntil && gameState.unconsciousUntil > Date.now()) {
                    ui.updateTimerVisuals();
                } else if (document.getElementById('modal-unconscious').classList.contains('open') && (!gameState.unconsciousUntil || gameState.unconsciousUntil <= Date.now())) {
                    // Close modal if timer expired naturally
                    ui.updateUnconsciousUI();
                }
            }, 1000);
        });

