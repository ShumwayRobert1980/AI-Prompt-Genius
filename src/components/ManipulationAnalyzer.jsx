import React, { useState } from "react"

// ============================================================
// DETECTION ENGINE
// ============================================================
const TACTICS = [
    {
        id: "gaslighting",
        name: "Gaslighting",
        emoji: "🌀",
        severity: "critical",
        severityLabel: "CRITICAL",
        alertClass: "alert-error",
        badgeClass: "badge-error",
        borderClass: "border-error",
        description: "Making you question your own memory, perception, and sanity to gain psychological control.",
        whatTheyWant:
            "To make you distrust yourself so you become dependent on their version of reality.",
        warning:
            "One of the most psychologically damaging forms of manipulation — prolonged exposure causes genuine self-doubt and confusion.",
        signs: [
            "They insist events happened differently from how you remember",
            "They call you 'crazy', 'too sensitive', or 'paranoid' when you raise concerns",
            "You often second-guess yourself after talking to them",
            "You feel confused or like you're 'losing your mind'",
        ],
        howToRespond: [
            "Keep a private journal with dates, times, and exactly what was said",
            "Confide in trusted friends/family to get outside perspective",
            'Say: "I hear that you see it differently, but my experience is valid"',
            "Trust your gut — if something felt wrong, it probably was",
        ],
        healthyExample:
            '"I remember that differently. Can we talk about what each of us experienced?"',
        toxicExample:
            '"That never happened. You\'re imagining things again. You always do this — you\'re so paranoid."',
        keywords: [
            "you're crazy",
            "never happened",
            "too sensitive",
            "you're imagining",
            "overreacting",
            "paranoid",
            "making things up",
            "that's not what happened",
            "you misunderstood",
            "you're being dramatic",
            "i never said that",
            "nobody believes you",
            "you always exaggerate",
        ],
        patterns: [
            /you('?re| are) (so |too )?(crazy|nuts|insane|paranoid|dramatic|overreacting|sensitive|emotional|ridiculous)/gi,
            /that (never|didn'?t) happen(ed)?/gi,
            /you('?re| are) imagin(ing|ed)?/gi,
            /i never said that/gi,
            /you misunderstood( me)?/gi,
            /you('?re| are) making (this|it|things) up/gi,
            /nobody (else )?(believes?|has a problem with|thinks|agrees)/gi,
            /you('?re| are) (always |constantly )?(exaggerating|overreacting|being dramatic)/gi,
        ],
    },
    {
        id: "guilt_tripping",
        name: "Guilt Tripping",
        emoji: "😔",
        severity: "high",
        severityLabel: "HIGH",
        alertClass: "alert-warning",
        badgeClass: "badge-warning",
        borderClass: "border-warning",
        description:
            "Using guilt to control behavior and make you feel responsible for managing their emotions.",
        whatTheyWant:
            "To get compliance by making you feel like a bad person for having needs or setting boundaries.",
        warning:
            "Healthy people take responsibility for their own feelings. Chronic guilt tripping is emotional manipulation.",
        signs: [
            "You feel guilty for having your own needs",
            "They bring up past favors whenever you disagree",
            "They make martyred statements when you don't comply",
            "You apologize constantly even when you've done nothing wrong",
        ],
        howToRespond: [
            "Recognize: other people's emotions are not yours to manage",
            'Say: "I understand you\'re upset, but I\'m not responsible for that"',
            "Don't apologize for having needs or healthy boundaries",
            "Notice: do you always feel guilty after talking to this person?",
        ],
        healthyExample:
            '"I feel hurt when plans change last minute. Can we find a solution together?"',
        toxicExample:
            '"Fine. After everything I\'ve done for you, I guess I just don\'t matter. Don\'t worry about me."',
        keywords: [
            "after everything i've done",
            "after all i've done",
            "i guess i'm not good enough",
            "fine",
            "don't worry about me",
            "i'll be fine",
            "thanks a lot",
            "i do everything for you",
            "you only think about yourself",
            "you never appreciate",
            "i sacrifice everything",
        ],
        patterns: [
            /after (everything|all) (i'?ve|i have) done (for you)?/gi,
            /i guess (i'?m|i am) (just )?not (good enough|important enough)/gi,
            /look what you('?ve| have)? (made me do|done)/gi,
            /you (really )?don'?t care (about me)?/gi,
            /if you (really |truly )?loved? me/gi,
            /i do everything (for you)?/gi,
            /you only think about yourself/gi,
            /you never appreciate/gi,
            /i sacrifice/gi,
        ],
    },
    {
        id: "love_bombing",
        name: "Love Bombing",
        emoji: "💣",
        severity: "medium",
        severityLabel: "MEDIUM",
        alertClass: "alert-info",
        badgeClass: "badge-info",
        borderClass: "border-info",
        description:
            "Overwhelming you with excessive, premature affection and attention to create fast emotional dependency.",
        whatTheyWant:
            "To create a trauma bond quickly, making you easier to control and less likely to leave when abuse starts.",
        warning:
            "Genuine love is built gradually. Extreme intensity early on is a warning sign, not a fairytale.",
        signs: [
            "They declare love or deep connection extremely quickly",
            "Compliments feel excessive or disconnected from who you actually are",
            "They want to be with you or talk constantly",
            "There's pressure to commit or escalate the relationship fast",
        ],
        howToRespond: [
            "Notice intensity that doesn't match the length of the relationship",
            "Slow things down — a healthy person will respect your pace",
            "Ask: Do they love 'you', or an idealized version of you?",
            "Watch for what happens when you say no or set a boundary",
        ],
        healthyExample:
            '"I really enjoy spending time with you. I want to get to know you more."',
        toxicExample:
            '"I\'ve never felt this way before. You\'re perfect. You\'re my soulmate. I love you already."',
        keywords: [
            "you're perfect",
            "you're the only one",
            "soulmate",
            "i've never felt this way",
            "we're meant to be",
            "you complete me",
            "i've been waiting my whole life",
            "you're not like others",
            "nobody understands me like you",
            "i've never met anyone like you",
            "i love you already",
        ],
        patterns: [
            /you('?re| are) (absolutely |truly )?perfect/gi,
            /you('?re| are) (the )?only one/gi,
            /i'?ve never felt this way/gi,
            /we'?re (meant to be|soulmates?)/gi,
            /you complete me/gi,
            /never (met|known|seen|found) anyone like you/gi,
            /nobody (understands|gets|knows) me like you/gi,
            /i love you already/gi,
        ],
    },
    {
        id: "threats",
        name: "Threats & Coercion",
        emoji: "⚠️",
        severity: "critical",
        severityLabel: "CRITICAL",
        alertClass: "alert-error",
        badgeClass: "badge-error",
        borderClass: "border-error",
        description:
            "Using explicit or implied threats to force compliance through fear of consequences.",
        whatTheyWant:
            "To control your behavior through fear — this bypasses your free will entirely.",
        warning:
            "Any threat is abuse. Threats of self-harm to control you are manipulation, not love.",
        signs: [
            "You feel afraid of what they'll do if you disagree",
            "They make veiled comments about what 'might happen'",
            "Threats escalate when you try to leave or set limits",
            "They threaten to harm themselves if you don't comply",
        ],
        howToRespond: [
            "Document ALL threats — screenshot, write down with date/time",
            "Tell a trusted person what's happening",
            "If self-harm threats are used to control you, contact a crisis line",
            "National DV Hotline: 1-800-799-7233 | Crisis Text Line: Text HOME to 741741",
        ],
        healthyExample:
            '"I\'m really upset right now. I need some space to calm down before we continue."',
        toxicExample: '"You\'ll regret this. You don\'t know what I\'m capable of. Watch yourself."',
        keywords: [
            "you'll regret",
            "you'll be sorry",
            "see what happens",
            "watch yourself",
            "you don't know what i'm capable of",
            "i'll make your life hell",
            "you'll pay for this",
            "i'll destroy you",
            "i'll hurt myself if",
        ],
        patterns: [
            /you'?ll (regret|be sorry|pay for this|see)/gi,
            /i'?ll hurt (myself|you) if/gi,
            /see what happens (when|if)/gi,
            /i'?ll (destroy|ruin|end|make) (you|your)/gi,
            /you don'?t (know|want to know) what i'?m capable of/gi,
            /watch (yourself|your back)/gi,
            /you'?ll pay (for this)?/gi,
        ],
    },
    {
        id: "blame_shifting",
        name: "Blame Shifting",
        emoji: "🔄",
        severity: "high",
        severityLabel: "HIGH",
        alertClass: "alert-warning",
        badgeClass: "badge-warning",
        borderClass: "border-warning",
        description:
            "Deflecting all responsibility for their actions onto you, regardless of what actually happened.",
        whatTheyWant:
            "To avoid accountability and keep you feeling at fault so they never have to change.",
        warning:
            "A pattern of never being wrong — where every problem is your fault — is itself a major red flag.",
        signs: [
            "You constantly end up apologizing for things they did",
            "Every argument ends with you being the problem",
            "They bring up unrelated past grievances when confronted",
            "They never take responsibility for their choices",
        ],
        howToRespond: [
            'Say: "What I did and what you did are two separate issues"',
            'Refuse to accept blame for their choices: "You chose to do that"',
            "Stay on topic — don't let them change the subject to your flaws",
            "Notice the pattern: does this happen every time they're held accountable?",
        ],
        healthyExample:
            '"I was wrong to react that way. I take responsibility for my behavior."',
        toxicExample:
            '"Look what you made me do. If you hadn\'t pushed me, none of this would have happened."',
        keywords: [
            "look what you made me do",
            "if you hadn't",
            "you pushed me to this",
            "you caused this",
            "because of you",
            "you drive me crazy",
            "this is your fault",
            "you made me do this",
            "you forced me",
        ],
        patterns: [
            /look what you('?ve| have)? made me do/gi,
            /if you (hadn'?t|didn'?t|wouldn'?t)/gi,
            /you (pushed|drove|forced) me (to|into)/gi,
            /this is your fault/gi,
            /because of you/gi,
            /you made me (do|act|say|become|react)/gi,
            /you (drove|drive|pushed|push) me (crazy|to this)/gi,
        ],
    },
    {
        id: "minimizing",
        name: "Minimizing & Dismissing",
        emoji: "🙄",
        severity: "medium",
        severityLabel: "MEDIUM",
        alertClass: "alert-info",
        badgeClass: "badge-info",
        borderClass: "border-info",
        description:
            "Downplaying your feelings, experiences, or the harm caused by their actions.",
        whatTheyWant:
            "To make your concerns seem unreasonable so they don't have to take responsibility or change.",
        warning:
            '"It was just a joke" is often used to test how much you\'ll tolerate.',
        signs: [
            "Your feelings are regularly called 'overreactions'",
            "Serious issues are brushed off as jokes",
            "You feel you have to prove your pain is 'real enough' to be valid",
            "You start to think your emotions are the problem",
        ],
        howToRespond: [
            'Say: "I hear that you see it as small. It matters to me, and that\'s enough."',
            "Don't let someone else define the scale of your pain",
            "Notice: do you constantly have to justify your feelings?",
            "Your feelings are data — they don't need to be 'earned'",
        ],
        healthyExample:
            '"I didn\'t realize that landed the wrong way. Thank you for telling me — I\'ll be more careful."',
        toxicExample:
            '"It was just a joke. Can\'t you take a joke? Stop being so sensitive and dramatic."',
        keywords: [
            "it was just a joke",
            "can't you take a joke",
            "you're being dramatic",
            "it's not a big deal",
            "stop overreacting",
            "chill out",
            "calm down",
            "you're so sensitive",
            "stop being so emotional",
            "it wasn't that bad",
            "you're exaggerating",
        ],
        patterns: [
            /it (was|'?s) (just|only) a joke/gi,
            /can'?t you take a joke/gi,
            /it'?s not (a )?(big deal|serious|that bad|major)/gi,
            /mountain out of a molehill/gi,
            /you'?re (being |so |too )?(dramatic|sensitive|emotional|needy|clingy)/gi,
            /it wasn'?t (even )?that bad/gi,
            /stop (being|overreacting|acting)|chill out/gi,
            /you'?re (always |constantly )?exaggerating/gi,
        ],
    },
    {
        id: "isolation",
        name: "Isolation Tactics",
        emoji: "🏚️",
        severity: "high",
        severityLabel: "HIGH",
        alertClass: "alert-warning",
        badgeClass: "badge-warning",
        borderClass: "border-warning",
        description:
            "Systematically cutting you off from your support network to increase control and dependency.",
        whatTheyWant:
            "To become your only source of support, making you completely dependent on them.",
        warning:
            "Isolation from loved ones is one of the strongest predictors of escalating abuse.",
        signs: [
            "You've slowly stopped seeing friends and family",
            "They find reasons to criticize everyone you're close to",
            "You feel guilty spending time with others",
            "Your world is shrinking to just this one person",
        ],
        howToRespond: [
            "Maintain relationships with friends and family — make it a priority",
            "Notice if one person has a 'problem' with all of your connections",
            "Tell trusted people what's happening — isolation thrives in secrecy",
            "Reconnect with people you've drifted from",
        ],
        healthyExample:
            '"I really love spending time with you and I also value my friendships. Both matter to me."',
        toxicExample:
            '"Your friends don\'t really care about you. They\'re toxic. It\'s just us against the world."',
        keywords: [
            "your friends don't really care",
            "your family is toxic",
            "they're jealous of us",
            "it's us against the world",
            "nobody understands us",
            "they don't want what's best for you",
            "you don't need them",
            "they're bad for you",
            "they're trying to separate us",
        ],
        patterns: [
            /your (friends?|family) (don'?t|doesn'?t) (really |actually )?(care|understand|want|have your)/gi,
            /they'?re (jealous|toxic|bad for you|against us|trying to)/gi,
            /you don'?t need (them|anyone (else)?|your (friends?|family))/gi,
            /it'?s (just )?(us|me and you) against (the world|everyone|them)/gi,
            /nobody (else )?understands (us|you|what we have)/gi,
            /they'?re trying to (separate|come between|break up) us/gi,
        ],
    },
    {
        id: "darvo",
        name: "DARVO",
        emoji: "🔃",
        severity: "high",
        severityLabel: "HIGH",
        alertClass: "alert-warning",
        badgeClass: "badge-warning",
        borderClass: "border-warning",
        description:
            "Deny, Attack, Reverse Victim and Offender — becoming the 'victim' the moment you confront them.",
        whatTheyWant:
            "To avoid accountability and put you on the defensive, so you end up apologizing to them.",
        warning:
            "If you confront someone about harm and end up apologizing to them, DARVO likely occurred.",
        signs: [
            "Confronting them always ends with you comforting them",
            "They attack your character when you raise a concern",
            "They deny everything, then claim to be the real victim",
            "You leave conversations feeling worse than before you raised the issue",
        ],
        howToRespond: [
            'Stay grounded: "I\'m not attacking you, I\'m sharing how I was affected"',
            "Don't let the topic change to their feelings about being confronted",
            "Recognize the pattern: confrontation → denial → attack → role reversal",
            "You're allowed to raise issues without being punished for it",
        ],
        healthyExample:
            '"That must have been hard to bring up. Thank you for telling me. Let me think about that."',
        toxicExample:
            '"How dare you accuse me of that! I can\'t believe you\'d say that. I\'m the one being hurt here!"',
        keywords: [
            "how dare you accuse me",
            "i can't believe you'd say that",
            "you're attacking me",
            "i'm the victim here",
            "you're hurting me",
            "how could you do this to me",
        ],
        patterns: [
            /how dare you (accuse|say|think|act like)/gi,
            /i (can'?t believe|would never expect) you'?d/gi,
            /you'?re (attacking|hurting|abusing) me/gi,
            /i'?m the (real )?(victim|one (being |who'?s) hurt)/gi,
            /how could you do this to me/gi,
        ],
    },
    {
        id: "future_faking",
        name: "Future Faking",
        emoji: "🎭",
        severity: "medium",
        severityLabel: "MEDIUM",
        alertClass: "alert-info",
        badgeClass: "badge-info",
        borderClass: "border-info",
        description:
            "Making promises about the future they never intend to keep, just to placate you in the moment.",
        whatTheyWant:
            "To buy time and keep you hooked with false hope, without actually having to change.",
        warning:
            "Watch behavior, not words. Repeated unfulfilled promises are a pattern, not a mistake.",
        signs: [
            "The same promises have been made and broken multiple times",
            "Promises appear specifically when you're about to leave or set a limit",
            "Nothing concrete ever changes after the promise is made",
            "You feel hopeful in the moment but disappointed over time",
        ],
        howToRespond: [
            "Look for consistent action over weeks and months, not words",
            'Set a specific, time-bound expectation: "By when?"',
            "Count how many times this promise has been made and broken",
            "Ask yourself: what has actually changed?",
        ],
        healthyExample:
            '"I know I\'ve been falling short. Here\'s specifically what I\'m going to do differently, starting now."',
        toxicExample:
            '"I promise I\'ll change. I swear this time things will be different. Just give me one more chance."',
        keywords: [
            "i promise i'll change",
            "i'll do better",
            "things will be different",
            "i swear this time",
            "just give me one more chance",
            "starting from now",
            "i'm going to change",
            "we'll talk about it later",
            "someday i'll",
        ],
        patterns: [
            /i (promise|swear) (i'?ll|i will|to) (change|do better|be different)/gi,
            /things will (be )?different (this time)?/gi,
            /just give me (one )?more chance/gi,
            /starting (from |right )?now/gi,
            /i'?m going to change/gi,
            /we'?ll (deal with|talk about|handle) it later/gi,
        ],
    },
    {
        id: "emotional_blackmail",
        name: "Emotional Blackmail",
        emoji: "⛓️",
        severity: "critical",
        severityLabel: "CRITICAL",
        alertClass: "alert-error",
        badgeClass: "badge-error",
        borderClass: "border-error",
        description:
            "Using Fear, Obligation, and Guilt (FOG) to force compliance by equating love with doing what they want.",
        whatTheyWant:
            "To get what they want by making you feel that saying no means you're a bad person who doesn't love them.",
        warning:
            '"If you loved me, you would..." is never a loving request. Real love doesn\'t require sacrificing yourself.',
        signs: [
            "Saying 'no' feels like a moral failure",
            "Your limits are treated as proof you don't care",
            "There are consequences (sulking, withdrawal) when you don't comply",
            "You feel foggy, confused, or guilty after interactions",
        ],
        howToRespond: [
            'Say: "I love you AND my answer is no. Both can be true."',
            "Recognize the FOG: Fear, Obligation, and Guilt are tools, not truths",
            'Give yourself time: "I need to think about that before I answer"',
            "A loving person accepts 'no' as a complete sentence",
        ],
        healthyExample:
            '"I\'d really love it if you came to this. No pressure though — I understand if you can\'t."',
        toxicExample:
            '"If you really loved me, you wouldn\'t even question this. A real partner would just do it."',
        keywords: [
            "if you loved me you would",
            "a real partner would",
            "a good partner would",
            "if you cared about me",
            "you owe me",
            "fine do whatever you want",
            "you're selfish for not",
            "a real friend would",
        ],
        patterns: [
            /if you (loved?|cared? about|really loved?) me (you would|you'?d)/gi,
            /a (good|real|decent|true|loving) (partner|friend|person|girlfriend|boyfriend|spouse|husband|wife) would/gi,
            /you owe (me|it to me|me that much)/gi,
            /you'?re (being )?selfish (for not|if you don'?t|because)/gi,
            /if you don'?t .{0,40} i'?ll/gi,
            /fine[,.]? do (whatever|what) you want/gi,
        ],
    },
]

function analyzeText(text) {
    if (!text || text.trim().length < 10) return { tactics: [], score: 0 }

    const detected = []

    for (const tactic of TACTICS) {
        const matches = new Set()

        for (const kw of tactic.keywords) {
            if (text.toLowerCase().includes(kw.toLowerCase())) {
                const idx = text.toLowerCase().indexOf(kw.toLowerCase())
                const start = Math.max(0, idx - 20)
                const end = Math.min(text.length, idx + kw.length + 20)
                const excerpt = text.slice(start, end).trim()
                matches.add(`"...${excerpt}..."`)
            }
        }

        for (const pattern of tactic.patterns) {
            const found = [...text.matchAll(new RegExp(pattern.source, pattern.flags))]
            for (const match of found) {
                const idx = match.index
                const start = Math.max(0, idx - 10)
                const end = Math.min(text.length, idx + match[0].length + 10)
                const excerpt = text.slice(start, end).trim()
                matches.add(`"...${excerpt}..."`)
            }
        }

        if (matches.size > 0) {
            detected.push({ ...tactic, matches: [...matches].slice(0, 3) })
        }
    }

    const scoreMap = { critical: 35, high: 25, medium: 15 }
    const rawScore = detected.reduce((sum, t) => sum + (scoreMap[t.severity] || 10), 0)
    const score = Math.min(100, rawScore)

    return { tactics: detected, score }
}

// ============================================================
// QUIZ DATA
// ============================================================
const QUIZ_QUESTIONS = [
    {
        id: 1,
        message:
            '"That never happened. You\'re imagining things again. You\'re so paranoid — this is exactly what you always do."',
        question: "What manipulation tactic is this?",
        options: [
            { text: "Gaslighting", correct: true },
            { text: "Guilt Tripping", correct: false },
            { text: "Love Bombing", correct: false },
            { text: "Blame Shifting", correct: false },
        ],
        explanation:
            "Gaslighting — denying reality and labeling you 'paranoid' to make you distrust your own memory and perception. The goal is to make you dependent on their version of events.",
    },
    {
        id: 2,
        message:
            '"After everything I\'ve done for you, this is how you treat me? Fine. I\'ll just suffer. Don\'t worry about me."',
        question: "This message is an example of:",
        options: [
            { text: "Healthy boundary-setting", correct: false },
            { text: "Guilt Tripping", correct: true },
            { text: "DARVO", correct: false },
            { text: "Future Faking", correct: false },
        ],
        explanation:
            "Classic guilt trip — invoking past sacrifices and performing suffering to pressure you into compliance, without directly asking for what they want.",
    },
    {
        id: 3,
        message:
            '"Look what you made me do. If you hadn\'t pushed me, none of this would have happened. This is your fault."',
        question: "Which tactic is being used?",
        options: [
            { text: "Love Bombing", correct: false },
            { text: "Minimizing", correct: false },
            { text: "Blame Shifting", correct: true },
            { text: "Emotional Blackmail", correct: false },
        ],
        explanation:
            "Blame shifting — adults are always responsible for their own choices, no matter what someone else said or did. No one can 'make' you do anything.",
    },
    {
        id: 4,
        message:
            '"It was just a joke. Can\'t you take a joke? You\'re always so sensitive and dramatic about everything."',
        question: "What is happening here?",
        options: [
            { text: "They are being playful", correct: false },
            { text: "Minimizing & Dismissing your feelings", correct: true },
            { text: "Healthy teasing between friends", correct: false },
            { text: "Future Faking", correct: false },
        ],
        explanation:
            "Minimizing — using 'it was a joke' to avoid accountability, then attacking your character (\"so sensitive\") to make the problem about you rather than their behavior.",
    },
    {
        id: 5,
        message:
            '"If you really loved me, you wouldn\'t question this. A real partner would just do it without making me ask twice."',
        question: "This is an example of:",
        options: [
            { text: "Emotional Blackmail", correct: true },
            { text: "Future Faking", correct: false },
            { text: "Isolation", correct: false },
            { text: "Love Bombing", correct: false },
        ],
        explanation:
            "Emotional blackmail — framing your refusal as proof you don't love them. Real love doesn't require you to sacrifice your wellbeing or override your own judgment to prove it.",
    },
    {
        id: 6,
        message:
            '"Your friends don\'t really care about you the way I do. They\'re toxic. It\'s just us against the world — you don\'t need them."',
        question: "Which red flag is present?",
        options: [
            { text: "They care about your wellbeing", correct: false },
            { text: "Isolation Tactics", correct: true },
            { text: "Constructive feedback", correct: false },
            { text: "Minimizing", correct: false },
        ],
        explanation:
            "Isolation — systematically criticizing your support network to become your only source of connection, creating total dependency and making it harder to leave.",
    },
    {
        id: 7,
        message:
            '"I promise I\'ll change. I swear this time things will be different. Please just give me one more chance."',
        question: "If this has been said many times without actual change, this is likely:",
        options: [
            { text: "Genuine growth and accountability", correct: false },
            { text: "Future Faking", correct: true },
            { text: "Love Bombing", correct: false },
            { text: "Healthy communication", correct: false },
        ],
        explanation:
            "Future faking — making promises to buy time and avoid consequences. The key signal is repetition without change. Watch behavior over months, not words in a heated moment.",
    },
    {
        id: 8,
        message:
            '"How dare you accuse me of that! I can\'t believe you\'d think that of me. I\'m the one being hurt here — not you!"',
        question: "This response to being confronted is called:",
        options: [
            { text: "DARVO (Deny, Attack, Reverse Victim/Offender)", correct: true },
            { text: "Healthy self-defense", correct: false },
            { text: "Gaslighting", correct: false },
            { text: "Blame Shifting", correct: false },
        ],
        explanation:
            "DARVO — when confronted, they Deny, Attack your character, then Reverse the victim/offender roles. A tell-tale sign: you confronted them about harm, and now you're comforting them.",
    },
    {
        id: 9,
        message:
            '"I understand that upset you. I shouldn\'t have said that — that was wrong of me. How can I make it right?"',
        question: "This is an example of:",
        options: [
            { text: "Future Faking", correct: false },
            { text: "Guilt Tripping", correct: false },
            { text: "Healthy Communication ✓", correct: true },
            { text: "Love Bombing", correct: false },
        ],
        explanation:
            "Healthy communication — they acknowledged your feelings, took clear responsibility without excuses or deflection, and asked how to repair things. This is what real accountability looks like.",
    },
    {
        id: 10,
        message:
            '"I\'ve never felt this way before. You\'re perfect. You\'re my soulmate — I\'ve been waiting my whole life for someone exactly like you."',
        question: "Said on the 3rd date, this is a warning sign called:",
        options: [
            { text: "Romantic and genuine", correct: false },
            { text: "Love Bombing", correct: true },
            { text: "Minimizing", correct: false },
            { text: "Threats & Coercion", correct: false },
        ],
        explanation:
            "Love bombing — overwhelming early affection creates artificial emotional intensity and dependency before you know the person. Real connection builds over time through consistent behavior, not grand declarations.",
    },
]

// ============================================================
// HELPERS
// ============================================================
function getScoreInfo(score) {
    if (score === 0)
        return {
            label: "No Flags Detected",
            color: "text-success",
            progressClass: "progress-success",
            badgeClass: "badge-success",
        }
    if (score <= 20)
        return {
            label: "Low Concern",
            color: "text-info",
            progressClass: "progress-info",
            badgeClass: "badge-info",
        }
    if (score <= 45)
        return {
            label: "Moderate Warning",
            color: "text-warning",
            progressClass: "progress-warning",
            badgeClass: "badge-warning",
        }
    if (score <= 70)
        return {
            label: "High Risk",
            color: "text-error",
            progressClass: "progress-warning",
            badgeClass: "badge-warning",
        }
    return {
        label: "DANGER — Multiple Tactics Detected",
        color: "text-error",
        progressClass: "progress-error",
        badgeClass: "badge-error",
    }
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function ManipulationAnalyzer() {
    const [phase, setPhase] = useState("analyze")
    const [inputText, setInputText] = useState("")
    const [results, setResults] = useState(null)
    const [activeTactic, setActiveTactic] = useState(null)
    const [learnSource, setLearnSource] = useState("all")

    const [quizIdx, setQuizIdx] = useState(0)
    const [quizAnswers, setQuizAnswers] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)
    const [showExplanation, setShowExplanation] = useState(false)
    const [quizComplete, setQuizComplete] = useState(false)

    function runAnalysis() {
        if (!inputText.trim() || inputText.trim().length < 10) return
        const r = analyzeText(inputText)
        setResults(r)
        setPhase("results")
    }

    function startQuiz() {
        setQuizIdx(0)
        setQuizAnswers([])
        setSelectedOption(null)
        setShowExplanation(false)
        setQuizComplete(false)
        setPhase("quiz")
    }

    function handleOptionClick(optIdx) {
        if (showExplanation) return
        setSelectedOption(optIdx)
        setShowExplanation(true)
        const correct = QUIZ_QUESTIONS[quizIdx].options[optIdx].correct
        setQuizAnswers(prev => [...prev, { idx: optIdx, correct }])
    }

    function nextQuestion() {
        if (quizIdx + 1 >= QUIZ_QUESTIONS.length) {
            setQuizComplete(true)
        } else {
            setQuizIdx(q => q + 1)
            setSelectedOption(null)
            setShowExplanation(false)
        }
    }

    const quizScore = quizAnswers.filter(a => a.correct).length

    // ---- QUIZ COMPLETE ----
    if (phase === "quiz" && quizComplete) {
        const pct = Math.round((quizScore / QUIZ_QUESTIONS.length) * 100)
        let grade, msg
        if (pct >= 90) {
            grade = "Expert"
            msg = "You have excellent awareness of manipulation tactics. Trust your instincts — they're sharp."
        } else if (pct >= 70) {
            grade = "Aware"
            msg = "Good foundational knowledge! Review the tactics you missed to strengthen your defenses."
        } else if (pct >= 50) {
            grade = "Learning"
            msg = "You're building awareness. Spend time in the Learn section to reinforce the patterns."
        } else {
            grade = "Beginner"
            msg = "This is exactly why this tool exists. The more you learn these patterns, the harder they are to use on you."
        }

        return (
            <div className="flex flex-col items-center justify-center h-full p-8">
                <div className="max-w-xl w-full">
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">{pct >= 70 ? "🛡️" : "📚"}</div>
                        <h2 className="text-3xl font-bold mb-2">Quiz Complete</h2>
                        <div className="text-5xl font-black mb-3">
                            {quizScore}/{QUIZ_QUESTIONS.length}
                        </div>
                        <div
                            className={`badge badge-lg mb-4 ${pct >= 70 ? "badge-success" : pct >= 50 ? "badge-warning" : "badge-error"}`}
                        >
                            {grade}
                        </div>
                        <p className="text-base-content/70">{msg}</p>
                    </div>
                    <progress
                        className={`progress w-full mb-8 ${pct >= 70 ? "progress-success" : pct >= 50 ? "progress-warning" : "progress-error"}`}
                        value={pct}
                        max="100"
                    ></progress>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <button className="btn btn-outline" onClick={startQuiz}>
                            Retake Quiz
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setPhase("learn")
                                setActiveTactic(null)
                            }}
                        >
                            📚 Study the Tactics
                        </button>
                        <button className="btn" onClick={() => setPhase("analyze")}>
                            ← Back to Analyzer
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // ---- QUIZ IN PROGRESS ----
    if (phase === "quiz") {
        const q = QUIZ_QUESTIONS[quizIdx]
        const lastAnswer = quizAnswers[quizAnswers.length - 1]

        return (
            <div className="flex flex-col h-full p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">🧪 Manipulation Recognition Test</h2>
                    <span className="text-sm text-base-content/60">
                        Question {quizIdx + 1} of {QUIZ_QUESTIONS.length}
                    </span>
                </div>
                <progress
                    className="progress progress-primary w-full mb-6"
                    value={quizIdx + 1}
                    max={QUIZ_QUESTIONS.length}
                ></progress>

                <div className="card bg-base-200 mb-5">
                    <div className="card-body p-4">
                        <div className="bg-base-300 rounded-lg p-4 mb-3 text-sm font-medium italic leading-relaxed">
                            {q.message}
                        </div>
                        <p className="font-semibold text-lg">{q.question}</p>
                    </div>
                </div>

                <div className="space-y-3 mb-5">
                    {q.options.map((opt, idx) => {
                        let btnClass =
                            "btn w-full justify-start text-left normal-case h-auto min-h-[2.5rem] py-2 px-4 "
                        if (showExplanation) {
                            if (opt.correct) btnClass += "btn-success "
                            else if (idx === selectedOption) btnClass += "btn-error "
                            else btnClass += "btn-outline opacity-50 "
                        } else if (idx === selectedOption) {
                            btnClass += "btn-primary "
                        } else {
                            btnClass += "btn-outline "
                        }
                        return (
                            <button
                                key={idx}
                                className={btnClass}
                                onClick={() => handleOptionClick(idx)}
                            >
                                {opt.text}
                            </button>
                        )
                    })}
                </div>

                {showExplanation && (
                    <div
                        className={`alert ${lastAnswer?.correct ? "alert-success" : "alert-error"} mb-5`}
                    >
                        <div>
                            <div className="font-bold">
                                {lastAnswer?.correct ? "✓ Correct!" : "✗ Not quite —"}
                            </div>
                            <div className="text-sm mt-1">{q.explanation}</div>
                        </div>
                    </div>
                )}

                {showExplanation && (
                    <button className="btn btn-primary" onClick={nextQuestion}>
                        {quizIdx + 1 >= QUIZ_QUESTIONS.length
                            ? "See Results →"
                            : "Next Question →"}
                    </button>
                )}

                <button
                    className="btn btn-ghost btn-sm mt-4 self-start"
                    onClick={() => setPhase("analyze")}
                >
                    ← Exit Quiz
                </button>
            </div>
        )
    }

    // ---- LEARN — TACTIC DETAIL ----
    if (phase === "learn" && activeTactic) {
        const t = TACTICS.find(t => t.id === activeTactic)

        return (
            <div className="flex flex-col h-full p-6 overflow-y-auto">
                <button
                    className="btn btn-ghost btn-sm mb-4 self-start"
                    onClick={() => setActiveTactic(null)}
                >
                    ← Back to Lessons
                </button>

                <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">{t.emoji}</span>
                    <div>
                        <h2 className="text-2xl font-bold">{t.name}</h2>
                        <span className={`badge ${t.badgeClass}`}>{t.severityLabel} SEVERITY</span>
                    </div>
                </div>

                <div className="divider"></div>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-lg mb-2">What Is It?</h3>
                        <p className="text-base-content/80">{t.description}</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-2">What Do They Want?</h3>
                        <p className="text-base-content/80">{t.whatTheyWant}</p>
                    </div>

                    <div className={`alert ${t.alertClass}`}>
                        <span className="font-semibold">⚡ {t.warning}</span>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-3">Warning Signs to Watch For</h3>
                        <ul className="space-y-2">
                            {t.signs.map((s, i) => (
                                <li key={i} className="flex gap-2 items-start">
                                    <span className="text-error mt-0.5 shrink-0">🚩</span>
                                    <span className="text-base-content/80">{s}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="card bg-success/10 border border-success">
                            <div className="card-body p-4">
                                <h4 className="font-bold text-success mb-2">
                                    ✅ Healthy Version
                                </h4>
                                <p className="text-sm italic text-base-content/80">
                                    {t.healthyExample}
                                </p>
                            </div>
                        </div>
                        <div className="card bg-error/10 border border-error">
                            <div className="card-body p-4">
                                <h4 className="font-bold text-error mb-2">🚫 Toxic Version</h4>
                                <p className="text-sm italic text-base-content/80">
                                    {t.toxicExample}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-3">How to Protect Yourself</h3>
                        <ul className="space-y-2">
                            {t.howToRespond.map((r, i) => (
                                <li key={i} className="flex gap-2 items-start">
                                    <span className="text-success mt-0.5 shrink-0">🛡️</span>
                                    <span className="text-base-content/80">{r}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    // ---- LEARN — TACTIC LIST ----
    if (phase === "learn") {
        const tacticList =
            learnSource === "results" && results?.tactics.length > 0 ? results.tactics : TACTICS

        return (
            <div className="flex flex-col h-full p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold">📚 Tactics Library</h2>
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setPhase(results ? "results" : "analyze")}
                    >
                        ← Back
                    </button>
                </div>
                <p className="text-base-content/60 mb-5">
                    Click any tactic to learn what it is, how to spot it, and how to protect
                    yourself.
                </p>

                <div className="grid grid-cols-1 gap-3">
                    {tacticList.map(t => (
                        <div
                            key={t.id}
                            className={`card bg-base-200 cursor-pointer hover:bg-base-300 transition-colors border-l-4 ${t.borderClass}`}
                            onClick={() => setActiveTactic(t.id)}
                        >
                            <div className="card-body p-4 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{t.emoji}</span>
                                    <div>
                                        <div className="font-bold">{t.name}</div>
                                        <div className="text-sm text-base-content/60 max-w-xs">
                                            {t.description.length > 60
                                                ? t.description.slice(0, 60) + "..."
                                                : t.description}
                                        </div>
                                    </div>
                                </div>
                                <span className={`badge ${t.badgeClass} shrink-0 ml-2`}>
                                    {t.severityLabel}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <button className="btn btn-primary" onClick={startQuiz}>
                        🧪 Test Your Knowledge
                    </button>
                    <button className="btn btn-outline" onClick={() => setPhase("analyze")}>
                        ← Back to Analyzer
                    </button>
                </div>
            </div>
        )
    }

    // ---- RESULTS ----
    if (phase === "results" && results) {
        const { tactics, score } = results
        const scoreInfo = getScoreInfo(score)

        return (
            <div className="flex flex-col h-full p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Analysis Results</h2>
                    <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setPhase("analyze")}
                    >
                        ← New Analysis
                    </button>
                </div>

                <div className="card bg-base-200 mb-5">
                    <div className="card-body p-5">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-lg">Overall Threat Score</span>
                            <span className={`text-2xl font-black ${scoreInfo.color}`}>
                                {score}/100
                            </span>
                        </div>
                        <progress
                            className={`progress ${scoreInfo.progressClass} w-full mb-2`}
                            value={score}
                            max="100"
                        ></progress>
                        <span className={`badge badge-lg ${scoreInfo.badgeClass}`}>
                            {scoreInfo.label}
                        </span>
                    </div>
                </div>

                {tactics.length === 0 ? (
                    <div className="alert alert-success mb-5">
                        <div>
                            <div className="font-bold">
                                ✅ No Obvious Manipulation Tactics Detected
                            </div>
                            <div className="text-sm mt-1">
                                The message doesn&apos;t match known manipulation patterns.
                                Remember: absence of obvious red flags doesn&apos;t guarantee
                                safety — context and patterns over time matter most.
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="font-bold mb-3 text-base-content/70">
                            {tactics.length} Tactic{tactics.length > 1 ? "s" : ""} Detected:
                        </div>
                        <div className="space-y-4 mb-5">
                            {tactics.map(t => (
                                <div
                                    key={t.id}
                                    className={`card bg-base-200 border-l-4 ${t.borderClass}`}
                                >
                                    <div className="card-body p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">{t.emoji}</span>
                                                <span className="font-bold">{t.name}</span>
                                            </div>
                                            <span className={`badge ${t.badgeClass}`}>
                                                {t.severityLabel}
                                            </span>
                                        </div>
                                        <p className="text-sm text-base-content/70 mb-3">
                                            {t.description}
                                        </p>

                                        <div className="bg-base-300 rounded p-3 mb-3">
                                            <div className="text-xs font-bold text-base-content/50 mb-1 uppercase tracking-wide">
                                                Matched in message:
                                            </div>
                                            {t.matches.map((m, i) => (
                                                <div
                                                    key={i}
                                                    className="text-sm font-mono text-error/80 mt-1"
                                                >
                                                    {m}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="text-sm text-base-content/60 mb-3">
                                            <span className="font-semibold">What they want: </span>
                                            {t.whatTheyWant}
                                        </div>

                                        <button
                                            className="btn btn-sm btn-outline self-start"
                                            onClick={() => {
                                                setActiveTactic(t.id)
                                                setLearnSource("results")
                                                setPhase("learn")
                                            }}
                                        >
                                            📖 How to Protect Yourself
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className="flex flex-wrap gap-3 mt-2">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setLearnSource("all")
                            setActiveTactic(null)
                            setPhase("learn")
                        }}
                    >
                        📚 Learn All Tactics
                    </button>
                    <button className="btn btn-secondary" onClick={startQuiz}>
                        🧪 Test Your Knowledge
                    </button>
                </div>
            </div>
        )
    }

    // ---- ANALYZE (DEFAULT) ----
    return (
        <div className="flex flex-col h-full p-6 overflow-y-auto">
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl">🛡️</span>
                    <div>
                        <h1 className="text-2xl font-bold">Manipulation Detector</h1>
                        <p className="text-base-content/60 text-sm">
                            Paste any message to analyze it for deception and manipulation tactics
                            — then learn to protect yourself.
                        </p>
                    </div>
                </div>
            </div>

            <div className="card bg-base-200 mb-4">
                <div className="card-body p-4">
                    <label className="font-semibold mb-2 block">Paste a Message to Analyze</label>
                    <textarea
                        className="textarea textarea-bordered w-full h-40 text-sm"
                        placeholder={
                            "Paste a text, DM, email, or something someone said...\n\nExamples:\n• A message that felt 'off' but you couldn't explain why\n• Something a partner, ex, friend, or family member sent\n• A conversation you want a second opinion on"
                        }
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                    />
                    <div className="text-xs text-base-content/40 mt-1">
                        {inputText.length} characters — minimum 10 required · All analysis is
                        100% local, nothing is stored or sent anywhere
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
                <button
                    className="btn btn-primary"
                    disabled={inputText.trim().length < 10}
                    onClick={runAnalysis}
                >
                    🔍 Analyze Message
                </button>
                <button
                    className="btn btn-outline"
                    onClick={() => {
                        setLearnSource("all")
                        setActiveTactic(null)
                        setPhase("learn")
                    }}
                >
                    📚 Learn the Tactics
                </button>
                <button className="btn btn-outline" onClick={startQuiz}>
                    🧪 Take the Quiz
                </button>
            </div>

            <div className="divider text-base-content/40 text-xs">HOW IT WORKS</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="card bg-base-200">
                    <div className="card-body p-4 text-center">
                        <div className="text-3xl mb-2">🔍</div>
                        <div className="font-bold mb-1">Analyze</div>
                        <div className="text-sm text-base-content/60">
                            Paste any message and our engine scans for {TACTICS.length} known
                            manipulation patterns
                        </div>
                    </div>
                </div>
                <div className="card bg-base-200">
                    <div className="card-body p-4 text-center">
                        <div className="text-3xl mb-2">📚</div>
                        <div className="font-bold mb-1">Learn</div>
                        <div className="text-sm text-base-content/60">
                            Understand exactly what each tactic does, why it works, and how to
                            respond
                        </div>
                    </div>
                </div>
                <div className="card bg-base-200">
                    <div className="card-body p-4 text-center">
                        <div className="text-3xl mb-2">🛡️</div>
                        <div className="font-bold mb-1">Protect</div>
                        <div className="text-sm text-base-content/60">
                            Test your knowledge with real scenarios to build lasting awareness and
                            resilience
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {TACTICS.map(t => (
                    <div
                        key={t.id}
                        className={`card bg-base-200 cursor-pointer hover:bg-base-300 transition-colors border-l-2 ${t.borderClass}`}
                        onClick={() => {
                            setActiveTactic(t.id)
                            setLearnSource("all")
                            setPhase("learn")
                        }}
                    >
                        <div className="card-body p-3 text-center">
                            <div className="text-xl">{t.emoji}</div>
                            <div className="text-xs font-semibold">{t.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
