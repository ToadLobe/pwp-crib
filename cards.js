/**
 * PWP Assessment Tool - Card Definitions
 * All assessment cards and sections
 */

// Section definitions with subsections
const sections = [
    { id: "introduction", name: "Introduction" },
    {
        id: "information-gathering",
        name: "Information Gathering",
        subsections: [
            { id: "problem", name: "Problem" },
            { id: "symptoms", name: "Symptoms" },
            { id: "impacts", name: "Impacts" },
            { id: "roms", name: "ROMs" },
            { id: "safety", name: "Safety" },
            { id: "context", name: "Context" },
            { id: "goals", name: "Goals" }
        ]
    },
    {
        id: "information-giving",
        name: "Information Giving",
        subsections: [
            { id: "diagnosis", name: "Diagnosis" },
            { id: "cbt", name: "CBT" },
            { id: "treatment", name: "Treatment Options" }
        ]
    },
    { id: "shared-decision-making", name: "Shared Decision Making" },
    {
        id: "ending",
        name: "Ending",
        subsections: [
            { id: "problem-statement", name: "Problem Statement" },
            { id: "next-steps", name: "Next Steps" }
        ]
    }
];

// All card definitions
const cards = [
    // ============================================================
    // 1. INTRODUCTION
    // ============================================================
    {
        id: "intro-1",
        section: "introduction",
        items: [
            { type: "direction", content: "Give your full name and preferred name." },
            { type: "direction", content: "Ask for the patient's full name and preferred name." },
            { type: "input", inputType: "text", label: "Patient's preferred name", stateKey: "patient-name", singleValue: true }
        ]
    },
    {
        id: "intro-2",
        section: "introduction",
        items: [
            { type: "verbatim", content: "Nice to meet you ${name}, how was your journey here?" },
            { type: "verbatim", content: "I'll start by telling you a little bit about myself. I'm a trainee Psychological Wellbeing Practitioner (PWP), which means I'm training to help people experiencing common mental health problems like depression and anxiety. As a PWP I work as part of a larger team, including other therapists, your GP, and employment support co-ordinators. I'm telling you this because, depending on the outcome of our assessment, it might not be me that carries on supporting you. Does that all make sense?" },
            { type: "verbatim", content: "So the assessment will last 45 minutes, do you have this time available now?" },
            { type: "verbatim", content: "Great. So over these next 45 minutes, I'd like you to explain to me some of the problems your facing at the moment. We'll go through some questionnaires and a safety assessment and then I'll give you some information about what our service might be able to offer you in terms of treatment. Is that okay?" },
            { type: "verbatim", content: "Alright. Another thing: you might hear me typing while we talk. I promise I'm paying attention, I'm just taking notes. These notes, and everything you tell me today will remain largely confidential within the service. The only exception to this is if you say something that indicates that you or someone else is at risk, as in that case I would have to pass this information on. If that happens I will always try to discuss this with you first, but this may not always be possible. Is that clear?" }
        ]
    },

    // ============================================================
    // 2. INFORMATION GATHERING - Problem
    // ============================================================
    {
        id: "problem-1",
        section: "information-gathering",
        subsection: "problem",
        items: [
            { type: "verbatim", content: "So ${name}, could you tell me a little bit about what's brought you here today?" },
            { type: "input", inputType: "text", label: "Core problem", stateKey: "core-problem", singleValue: true },
            { type: "search", label: "Category", stateKey: "category", options: ["Anxiety", "Mood", "Pain", "Panic", "Stress", "Other"], singleValue: true }
        ]
    },
    {
        id: "problem-2",
        section: "information-gathering",
        subsection: "problem",
        items: [
            { type: "direction", content: "Explore the three Ws." },
            { type: "verbatim", content: "Is there a specific place or situation where..." },
            { type: "input", inputType: "text", label: "Where?", stateKey: "where" },
            { type: "verbatim", content: "Is there a specific time of day where..." },
            { type: "input", inputType: "text", label: "When?", stateKey: "when" },
            { type: "verbatim", content: "Is there a specific person or group of people who make you feel..." },
            { type: "input", inputType: "text", label: "Who?", stateKey: "who" }
        ]
    },
    {
        id: "problem-3",
        section: "information-gathering",
        subsection: "problem",
        items: [
            { type: "verbatim", content: "Have you noticed anything specific that triggers this feeling?" },
            { type: "input", inputType: "text", label: "Triggers", stateKey: "triggers" }
        ]
    },

    // ============================================================
    // 2. INFORMATION GATHERING - Symptoms
    // ============================================================
    {
        id: "symptoms-1",
        section: "information-gathering",
        subsection: "symptoms",
        items: [
            { type: "verbatim", content: "To help me get a really clear picture, I'm going to ask some specific questions about three areas, and those are your physical sensations, your behaviours, and your thoughts. So starting with your physical sensations..." },
            { type: "input", inputType: "text", label: "Sensations", stateKey: "sensations" },
            { type: "input", inputType: "text", label: "Behaviours", stateKey: "behaviours" },
            { type: "input", inputType: "text", label: "Thoughts", stateKey: "thoughts" },
            { type: "direction", content: "Ask clearly if there are any other sensations, behaviours or thoughts for each category." },
            { type: "direction", content: "Explore symptoms by asking about frequency, intensity, duration, and onset (FIDO)." }
        ]
    },
    {
        id: "symptoms-2",
        section: "information-gathering",
        subsection: "symptoms",
        items: [
            { type: "direction", content: "Summarise symptoms back to the patient." }
        ]
    },

    // ============================================================
    // 2. INFORMATION GATHERING - Impacts
    // ============================================================
    {
        id: "impacts-1",
        section: "information-gathering",
        subsection: "impacts",
        items: [
            { type: "direction", content: "Ask about the impact of the patient's symptoms on aspects of their life." },
            { type: "input", inputType: "text", label: "Impact at work", stateKey: "impact-work" },
            { type: "input", inputType: "text", label: "Impact at home", stateKey: "impact-home" },
            { type: "input", inputType: "text", label: "Impact on hobbies", stateKey: "impact-hobbies" },
            { type: "input", inputType: "text", label: "Impact on social life", stateKey: "impact-social" },
            { type: "input", inputType: "text", label: "Impact on relationships", stateKey: "impact-relationships" }
        ]
    },

    // ============================================================
    // 2. INFORMATION GATHERING - ROMs
    // ============================================================
    {
        id: "roms-1",
        section: "information-gathering",
        subsection: "roms",
        items: [
            { type: "verbatim", content: "Now I'd like to ask you to complete a couple of short questionnaires. They're just help us get a snapshot of how you've been feeling over the last two weeks and help us track your progress." },
            { type: "direction", content: "Pass the patient the ROMS." },
            { type: "verbatim", content: "So this is the PHQ-9, which asks you about symptoms of depression and low mood. This one is the GAD-7, which asks about symptoms of anxiety. As you can see, you are asked how often in the last two weeks you have experienced each symptom - either not at all, several days, more than half the days, or nearly every day. We can go through them together, or you can fill them out on your own, whichever you prefer." },
            { type: "input", inputType: "number", label: "PHQ-9 score", stateKey: "phq9-score", singleValue: true },
            { type: "input", inputType: "number", label: "PHQ-9 Q9 score", stateKey: "phq9-q9", singleValue: true },
            { type: "input", inputType: "number", label: "GAD-7 score", stateKey: "gad7-score", singleValue: true }
        ]
    },
    {
        id: "roms-feedback",
        section: "information-gathering",
        subsection: "roms",
        showIf: (state) => state.inputs["phq9-score"]?.[0] >= 0 || state.inputs["gad7-score"]?.[0] >= 0,
        items: [
            {
                type: "verbatim",
                content: (state) => {
                    let feedback = "";
                    const phq = state.inputs["phq9-score"]?.[0];
                    const gad = state.inputs["gad7-score"]?.[0];

                    if (phq >= 0) {
                        if (phq < 5) feedback += "Your score on the PHQ-9 indicates that you are experiencing sub-clinical depressive symptoms. What this means is that you are not feeling depressed any more frequently than the average person.\n\n";
                        else if (phq < 10) feedback += "Your score on the PHQ-9 indicates that you are experiencing mild depressive symptoms. What this means is that you have felt depressed for several days over the past two weeks.\n\n";
                        else if (phq < 15) feedback += "Your score on the PHQ-9 indicates that you are experiencing moderate depressive symptoms. What this means is that you have felt depressed for more than half the days over the past two weeks.\n\n";
                        else feedback += "Your score on the PHQ-9 indicates that you are experiencing severe depressive symptoms. What this means is that you have felt very depressed almost every day over the past two weeks.\n\n";
                    }

                    if (gad >= 0) {
                        if (gad < 5) feedback += "Your score on the GAD-7 indicates that you are experiencing sub-clinical anxiety symptoms. What this means is that you are not feeling anxious any more frequently than the average person.";
                        else if (gad < 10) feedback += "Your score on the GAD-7 indicates that you are experiencing mild anxiety symptoms. What this means is that you have felt anxious for several days over the past two weeks.";
                        else if (gad < 15) feedback += "Your score on the GAD-7 indicates that you are experiencing moderate anxiety symptoms. What this means is that you have felt anxious for more than half the days over the past two weeks.";
                        else feedback += "Your score on the GAD-7 indicates that you are experiencing severe anxiety symptoms. What this means is that you have felt very anxious almost every day over the past two weeks.";
                    }

                    return feedback;
                }
            },
            { type: "direction", content: "Check these results reflect the patient's experience." }
        ]
    },

    // ============================================================
    // 2. INFORMATION GATHERING - Safety
    // ============================================================
    {
        id: "safety-1",
        section: "information-gathering",
        subsection: "safety",
        items: [
            { type: "verbatim", content: "When we experience mental health difficulties, it's common to have thoughts about things like suicide and self-harm, so we're going to complete a safety assessment now which will ask about these and other areas of your safety. We do this at every appointment with every patient, because someone's safety can change quickly." },
            { type: "direction", content: "Ask the following questions. If the patient answers anything other than 'no' for a question, funnel using FIDO and potentially create a safety plan at the end." },
            { type: "verbatim", content: "Are you currently experiencing any thoughts of suicide?" },
            { type: "verbatim", content: "Have you made any current plans to end your life?" },
            { type: "verbatim", content: "Have you taken any recent actions towards ending your life?" },
            { type: "verbatim", content: "Have you ever experienced thoughts of suicide in the past?" },
            { type: "verbatim", content: "Have you ever taken any actions towards ending your life in the past?" },
            { type: "verbatim", content: "If you were to ever have these thoughts, what things would stop you acting on them?" },
            { type: "input", inputType: "text", label: "Protective factors", stateKey: "protective-factors" },
            { type: "verbatim", content: "Do you have any current thoughts of self-harm?" },
            { type: "verbatim", content: "Have you taken any recent actions towards self-harm?" },
            { type: "verbatim", content: "Have you ever self-harmed in the past?" },
            { type: "verbatim", content: "Do you feel that you currently pose a risk of harm to anyone else?" },
            { type: "verbatim", content: "Do you feel at risk of harm from anyone else currently?" },
            { type: "verbatim", content: "Do you feel that you are currently neglecting yourself in any way?" },
            { type: "verbatim", content: "Is there anyone who depends on you for their care at the moment?" },
            { type: "verbatim", content: "Are you experiencing any difficulties meeting the needs of the people in your care?" },
            { type: "verbatim", content: "Do you feel that you might be neglecting the needs of anyone else at all?" },
            { type: "verbatim", content: "If your answers to any of these questions were to change, do you know who you would speak to or where you would go?" }

        ]
    },
    {
        id: "safety-2",
        section: "information-gathering",
        subsection: "safety",
        items: [
            { type: "direction", content: "Confirm the patient's score of ${phq9q9score} on the PHQ-9 Q9 is consistent with their responses (the question which asks about thoughts of being better off dead or hurting yourself)." }
        ]
    },
    {
        id: "safety-3",
        section: "information-gathering",
        subsection: "safety",
        items: [
            { type: "direction", content: "Summarise the patient's answers to the safety assessment." },
        ]
    },
    {
        id: "safety-4",
        section: "information-gathering",
        subsection: "safety",
        items: [
            { type: "search", label: "Full safety plan required?", stateKey: "safety-plan-required", options: ["yes", "no"], singleValue: true }
        ]
    },
    {
        id: "safety-5",
        section: "information-gathering",
        subsection: "safety",
        items: [
            { type: "direction", content: "Give the patient the safety information sheet." }
        ]
    },
    {
        id: "safety-plan",
        section: "information-gathering",
        subsection: "safety",
        showIf: (state) => state.inputs["safety-plan-required"]?.[0] === "yes",
        items: [
            { type: "input", inputType: "text", label: "Early warning signs", stateKey: "warning-signs" },
            { type: "input", inputType: "text", label: "Coping strategies", stateKey: "coping-strategies" },
            { type: "input", inputType: "text", label: "Support networks", stateKey: "support-networks" },
            { type: "input", inputType: "text", label: "Contact points", stateKey: "contact-points" },
            { type: "input", inputType: "text", label: "Disposal of means", stateKey: "disposal-means" }
        ]
    },

    // ============================================================
    // 2. INFORMATION GATHERING - Context
    // ============================================================
    {
        id: "context-1",
        section: "information-gathering",
        subsection: "context",
        items: [
            { type: "verbatim", content: "Now I'd like to ask you some broader questions to get some more context." },
            { type: "search", label: "Other mental health conditions", stateKey: "other-mh-conditions", options: ["None", "Depression", "Generalised Anxiety Disorder", "Panic Disorder", "Agoraphobia", "Social Phobia", "Specific Phobia", "OCD", "PTSD", "Bipolar Disorder", "Schizophrenia", "Personality Disorder", "Eating Disorder", "ADHD", "Autism", "Other"] },
            { type: "input", inputType: "text", label: "Physical long-term health conditions", stateKey: "physical-conditions" }
        ]
    },
    {
        id: "context-identity",
        section: "information-gathering",
        subsection: "context",
        items: [
            { type: "verbatim", content: "Are there any aspects of your identity that might be relevant to your treatment? This could include things like neurodivergence, ethnicity, faith, sexuality..." },
            { type: "input", inputType: "text", label: "Identity aspects", stateKey: "identity-aspects" }
        ]
    },
    {
        id: "context-factors",
        section: "information-gathering",
        subsection: "context",
        items: [
            { type: "input", inputType: "text", label: "Predisposing factors", stateKey: "predisposing-factors" },
            { type: "input", inputType: "text", label: "Perpetuating factors", stateKey: "perpetuating-factors" }
        ]
    },
    {
        id: "context-2",
        section: "information-gathering",
        subsection: "context",
        items: [
            { type: "input", inputType: "text", label: "Onset", stateKey: "onset" },
            { type: "input", inputType: "text", label: "Motivation for seeking help now", stateKey: "motivation-now" }
        ]
    },
    {
        id: "context-3",
        section: "information-gathering",
        subsection: "context",
        items: [
            { type: "input", inputType: "text", label: "Current treatments", stateKey: "current-treatments" },
            { type: "input", inputType: "text", label: "Past treatments", stateKey: "past-treatments" }
        ]
    },
    {
        id: "context-4",
        section: "information-gathering",
        subsection: "context",
        items: [
            { type: "search", label: "Medication for mental health", stateKey: "mh-medication", options: medications },
            { type: "input", inputType: "text", label: "Attitude towards medication", stateKey: "medication-attitude" }
        ]
    },
    {
        id: "context-4b",
        section: "information-gathering",
        subsection: "context",
        items: [
            { type: "input", inputType: "text", label: "Use of OTC medication", stateKey: "otc-medication" },
            { type: "input", inputType: "text", label: "Use of herbal remedies", stateKey: "herbal-remedies" }
        ]
    },
    {
        id: "context-5",
        section: "information-gathering",
        subsection: "context",
        items: [
            { type: "verbatim", content: "You might have come here today with some expectations regarding treatment and what we do at NHS TT. Do you have any specific expectations?" },
            { type: "input", inputType: "text", label: "Expectations", stateKey: "expectations" }
        ]
    },
    {
        id: "context-6",
        section: "information-gathering",
        subsection: "context",
        items: [
            { type: "direction", content: "Ask about substance use, and specifically if it has changed." },
            { type: "input", inputType: "text", label: "Caffeine consumption", stateKey: "caffeine" },
            { type: "input", inputType: "text", label: "Alcohol consumption", stateKey: "alcohol" },
            { type: "input", inputType: "text", label: "Recreational drug use", stateKey: "drugs" }
        ]
    },
    {
        id: "context-7",
        section: "information-gathering",
        subsection: "context",
        items: [
            { type: "direction", content: "Ask explicitly if there is anything else the patient would like to mention." }
        ]
    },
    {
        id: "goals",
        section: "information-gathering",
        subsection: "goals",
        items: [
            { type: "direction", content: "Establish clear, specific and measurable patient goals." },
            { type: "input", inputType: "text", label: "Patient goals", stateKey: "goals" }
        ]
    },

    // ============================================================
    // 3. INFORMATION GIVING - Diagnosis
    // ============================================================
    {
        id: "diagnosis-1",
        section: "information-giving",
        subsection: "diagnosis",
        items: [
            { type: "search", label: "Diagnosis", stateKey: "diagnosis", options: ["Depression", "GAD", "Panic Disorder", "Agoraphobia", "Agoraphobia with Panic Disorder", "Phobia", "OCD", "PTSD", "Social Phobia", "Hypochondriasis", "BDD"], singleValue: true }
        ]
    },
    {
        id: "diagnosis-info",
        section: "information-giving",
        subsection: "diagnosis",
        showIf: (state) => state.inputs["diagnosis"]?.[0],
        items: [
            {
                type: "direction",
                content: (state) => {
                    const dx = state.inputs["diagnosis"]?.[0];
                    const info = {
                        "Depression": {
                            verbatim: "Depression is very common—about 1 in 20 people experience it at some point. It's important to understand that depression is more than just feeling sad or having a bad day. What we're talking about is a persistent low mood that lasts at least two weeks, where you might feel hopeless and lose interest or pleasure in things you normally enjoy. It can affect everything—your sleep might be disrupted, you might have changes in appetite, and you often feel exhausted even when you haven't done much. You might find it hard to concentrate, feel guilty or worthless, or have thoughts about harming yourself. These feelings are very real and very understandable given what you're experiencing. The good news is that depression is one of the most treatable mental health conditions. With the right support and treatment, people recover well and go on to live fulfilling lives."
                        },
                        "GAD": {
                            verbatim: "Generalised Anxiety Disorder, or GAD, affects about 3 in every 100 adults, and it often develops gradually, so people sometimes don't realise when it's started. With GAD, you experience excessive worry that you find difficult to control—it can be about anything really: money, your health, work, your relationships, or things that haven't even happened yet. The key thing is that this worry feels out of proportion to what's actually happening. Along with the worry, you'll often notice physical symptoms like muscle tension, a feeling of restlessness, difficulty sleeping, fatigue, and trouble concentrating. The worry can feel like it's always there, even on days when there's nothing particular to worry about. What's important to know is that this constant worry is your mind trying to protect you, but it's become stuck in overdrive. The encouraging news is that GAD is highly treatable. With the right therapeutic approaches, you can learn to manage your worry and regain a sense of calm and control in your life."
                        },
                        "Panic Disorder": {
                            verbatim: "Panic Disorder affects about 2.7% of adults at some point in their life. The hallmark of panic disorder is recurrent panic attacks—sudden, intense episodes of fear that come on quickly and peak within a few minutes. During a panic attack, you might experience a racing heart, sweating, shortness of breath, chest pain, dizziness, or a sense of being detached from reality. The really difficult part is that after one or two of these attacks, many people develop a fear of having another attack. This fear can become so intense that you start to avoid situations where you think an attack might happen, or where you'd feel trapped if one did. This avoidance often makes the problem worse over time. The important thing to understand is that panic attacks, while terrifying, are not dangerous—your body is having a false alarm. The good news is that panic disorder is very treatable. With the right support, you can learn to understand your panic attacks and break the cycle of fear, which allows them to become less frequent and less intense."
                        },
                        "Agoraphobia": {
                            verbatim: "Agoraphobia affects about 1.7% of adolescents and adults. The word literally means 'fear of the marketplace,' but it's really an intense fear of situations where you feel trapped or where escape might be difficult, or where help might not be available if something goes wrong. Without panic attacks, agoraphobia develops as a fear response to places or situations themselves. People with agoraphobia often avoid public transport, crowded places, queues, open spaces like bridges or car parks, or enclosed spaces like shops. In severe cases, it can lead to avoiding leaving home altogether. It's a very real and distressing condition, but the encouraging news is that it's also very treatable. With effective treatment, people can gradually face these situations again and reclaim their independence and freedom."
                        },
                        "Agoraphobia with Panic Disorder": {
                            verbatim: "When Agoraphobia develops together with Panic Disorder, it creates a particularly distressing cycle. You experience recurrent panic attacks—sudden, intense episodes of fear that peak within minutes, with symptoms like racing heart, sweating, shortness of breath, or chest pain. The fear of having another attack becomes so powerful that you start avoiding situations where you believe an attack might happen, or where escape would be difficult or help unavailable. This might mean avoiding public transport, crowded places, queues, open spaces, or enclosed spaces. Over time, as you avoid more and more situations, your world can become increasingly smaller, and the anxiety becomes even more entrenched. What makes this condition particularly difficult is that the fear of the panic attack itself fuels the avoidance, which reinforces the belief that these situations are dangerous. However, this combination is highly treatable with the right support."
                        },
                        "Phobia": {
                            verbatim: "Specific phobias are very common—they affect between 7 and 9% of the population at some point. A phobia is an intense, irrational fear of a specific object or situation—it could be spiders, heights, needles, flying, water, or something else entirely. The key feature is that when you encounter or even think about the thing you're afraid of, the fear is immediate, overwhelming, and out of proportion to any real danger. Your body goes into a fight-or-flight response: your heart races, you sweat, and you feel intense panic. Because the fear is so strong, you'll do whatever you can to avoid the thing you're afraid of. Avoidance makes sense in the short term because it gets rid of the anxiety, but over time it actually reinforces the fear. The good news is that specific phobias are among the most treatable of all mental health conditions. With the right therapeutic approach, most people can overcome their phobia and face the thing they were afraid of."
                        },
                        "OCD": {
                            verbatim: "Obsessive-Compulsive Disorder, or OCD, affects millions of people at some point in their life. OCD involves a cycle of two main components: obsessions and compulsions. Obsessions are unwanted, intrusive thoughts, images, or urges that pop into your mind repeatedly and cause significant anxiety or distress. They're often about themes like contamination, harm coming to yourself or others, needing things to be 'just right,' or thoughts that don't fit with your values. Compulsions are repetitive behaviours or mental acts that you feel driven to perform to try to reduce the anxiety caused by the obsession—things like checking, cleaning, arranging, counting, or repeating. The problem is that while compulsions provide temporary relief, they actually feed the cycle: they tell your brain that the threat is real, so the obsessions come back even stronger. The important thing to understand is that having these thoughts doesn't mean there's anything wrong with you—intrusive thoughts are actually very common. The good news is that OCD is very treatable. With the right therapy, you can learn to break the cycle and reduce both the obsessions and compulsions, allowing you to reclaim your time and mental peace."
                        },
                        "PTSD": {
                            verbatim: "Post-Traumatic Stress Disorder, or PTSD, develops after experiencing or witnessing a traumatic event—something that was life-threatening or involved serious injury or threat to your physical integrity. About 1 in 25 adults has experienced PTSD in the past year, and importantly, not everyone who experiences trauma develops it. With PTSD, memories of the trauma feel as though they're happening again in the present—you might have flashbacks where you're right back in the moment, or nightmares that jolt you awake. You might feel a constant need to be on guard, find yourself easily startled, or feel like you're in danger even when you're safe. Many people avoid anything that reminds them of the trauma, and they often experience negative feelings like guilt, shame, anger, or emotional numbness. These symptoms cause significant distress and interfere with daily life. What's important to know is that PTSD is a normal response to an abnormal event—your mind and body are trying to protect you. The encouraging news is that PTSD is treatable. With the right therapy, you can process the trauma and move forward, allowing you to feel safer and regain control of your life."
                        },
                        "Social Phobia": {
                            verbatim: "Social Phobia, also called Social Anxiety Disorder, is very common—it affects an estimated 7% of adults. It's an intense, persistent fear of social situations where you might be watched or judged by others. The core fear is that you'll act in a way that will be embarrassing, humiliating, or that others will think negatively of you. These situations might include things like public speaking, eating or drinking in front of others, socialising at parties, or even just making eye contact. When you're in these situations, you experience significant anxiety—your heart races, you sweat, you might feel shaky or your mind goes blank. Because the anxiety is so strong, you'll often go to great lengths to avoid these situations altogether, which can become very limiting and affect your relationships, work, and quality of life. What's important to know is that the fear you experience is real, but it often doesn't match reality—most people are far less judgmental than you believe. The good news is that social anxiety is very treatable. With the right support, you can gradually face social situations and discover that you're able to cope, which allows your anxiety to decrease and your confidence to grow."
                        },
                        "Hypochondriasis": {
                            verbatim: "Health Anxiety, formerly called Hypochondriasis, affects between 1.3 and 10% of people in the general population. The core feature is a persistent, excessive worry about having or developing a serious, undiagnosed illness—like cancer, heart disease, or a rare condition. People with health anxiety often misinterpret normal bodily sensations: you might notice a slight ache and become convinced it's a tumour, or feel your heart skip a beat and panic that it means you have a heart problem. You might repeatedly check your body, research your symptoms online, or seek constant reassurance from doctors or loved ones, but the reassurance only provides temporary relief before the worry returns. This cycle of worry, checking, and seeking reassurance can become very time-consuming and distressing, even when medical tests show there's nothing wrong. What's important to understand is that your worry comes from caring about your health—that's actually a good thing. The good news is that health anxiety is very treatable. With the right support, you can break the cycle of worry and checking, learn to tolerate uncertainty, and regain peace of mind about your health."
                        },
                        "BDD": {
                            verbatim: "Body Dysmorphic Disorder, or BDD, affects about 2.4% of adults—roughly as common as OCD. It's characterised by a preoccupation with one or more perceived flaws in your physical appearance that are either minor or not observable to other people. Despite the flaw being small or invisible to others, you experience significant distress about it and spend a lot of time thinking about it. This often leads to repetitive behaviours aimed at checking or fixing the perceived flaw—you might spend hours mirror checking, comparing your appearance to others, grooming excessively, or seeking reassurance about how you look. You might avoid social situations, wear certain clothes to hide the flaw, or even have cosmetic procedures in an attempt to fix it. These behaviours provide only temporary relief, and the preoccupation often intensifies over time. What's important to understand is that BDD is not vanity or shallow—it's a real psychological condition where the way you perceive your appearance doesn't match how others see you. The good news is that BDD is treatable. With the right therapy, you can change how you think about your appearance, reduce the compulsive behaviours, and improve your quality of life."
                        }
                    };

                    const data = info[dx] || { verbatim: "" };
                    return `Have you heard of ${dx} before? ${data.verbatim} (Once you've finished reading this, check the patient's understanding by asking them to reflect back what they've heard.)`;
                }
            }
        ]
    },

    // ============================================================
    // 3. INFORMATION GIVING - CBT
    // ============================================================
    {
        id: "cbt-1",
        section: "information-giving",
        subsection: "cbt",
        items: [
            { type: "verbatim", content: "Many of the treatments we offer at NHS TT are based on CBT, which stands for cognitive behavioural therapy. Can I ask if you've heard of CBT before?" },
            { type: "direction", content: "Explain CBT using the patient's symptoms as examples." },
            { type: "diagram-link", label: "Show CBT cycle diagram" },
            { type: "direction", content: "Check patient understanding." },
            { type: "direction", content: "Explain how the CBT cycle can be broken using therapy." },
            { type: "direction", content: "Check patient understanding again." }
        ]
    },

    // ============================================================
    // 3. INFORMATION GIVING - Treatment
    // ============================================================
    {
        id: "treatment-decision",
        section: "information-giving",
        subsection: "treatment",
        items: [
            {
                type: "direction",
                content: (state) => {
                    const dx = state.inputs["diagnosis"]?.[0];
                    const phq = state.inputs["phq9-score"]?.[0];
                    const gad = state.inputs["gad7-score"]?.[0];

                    const guidance = {
                        "Depression": phq >= 15 ? `HiCBT is recommended for severe cases (PHQ-9 Score:${phq})` : `LiCBT is recommended for non-severe cases (PHQ-9 Score:${phq})`,
                        "GAD": gad >= 15 ? `HiCBT is recommended for severe cases (PHQ-9 Score:${gad})` : `LiCBT is recommended for non-severe cases (PHQ-9 Score:${gad})`,
                        "Panic Disorder": "Depends on impact severity",
                        "Agoraphobia": "Depends on impact severity",
                        "Phobia": "LiCBT (except for Trypanophobia/Emetophobia use HiCBT)",
                        "OCD": "Depends on symptom severity and nature of compulsions",
                        "PTSD": `Always HiCBT for ${dx}`,
                        "Social Phobia": `Always HiCBT for ${dx}`,
                        "Hypochondriasis": `Always HiCBT for ${dx}`,
                        "BDD": `Always HiCBT for ${dx}`
                    };

                    return `Treatment decision guidance: ${guidance[dx] || "Consider impact severity"}`;
                }
            },
            { type: "search", label: "Treatment", stateKey: "treatment", options: ["LiCBT", "HiCBT"], singleValue: true }
        ]
    },
    {
        id: "treatment-info",
        section: "information-giving",
        subsection: "treatment",
        showIf: (state) => state.inputs["treatment"]?.[0],
        items: [
            {
                type: "verbatim",
                content: (state) => {
                    const tx = state.inputs["treatment"]?.[0];
                    if (tx === "LiCBT") {
                        return "I think the treatment you would find most helpful is something called guided self-help, which is a form of CBT. It's a great starting point because it's very flexible and puts you in control. We'd use resources we know are effective, like worksheets or sometimes an online programme, that explains the links between your thoughts, feelings, and behaviours. My role would be to act as your guide, checking in with you regularly in brief 35 minute sessions to offer support, help you overcome any obstacles, and make sense of the new techniques you're learning. Lasts 4-6 sessions. It's a way to learn powerful skills without the commitment of longer, more formal therapy sessions straight away, and it tends to be very effective for people in your position.";
                    } else {
                        return "I think the treatment you would find most helpful is something called High-Intensity Cognitive Behavioural Therapy, or CBT. Because you've described your symptoms as being particularly severe and having a big impact on your life, this approach would give you more 1-on-1 time and allow you to dive deeper into what's going on. You would meet regularly, usually weekly, with a CBT therapist for 50-minute sessions. Together, you'd be able to explore the root of these difficulties in more detail and develop a very personalised plan to tackle them more deeply, which tends to be very effective for people in your position.";
                    }
                }
            },
            { type: "direction", content: "Ask how the patient feels about this course of treatment." }
        ]
    },

    // ============================================================
    // 4. SHARED DECISION MAKING
    // ============================================================
    {
        id: "sdm-1",
        section: "shared-decision-making",
        items: [
            { type: "verbatim", content: "It's really important to explore issues which might impact your engagement with this treatment, so I'm going to ask you some questions about your capability, opportunities, and motivation regarding ${treatment}. Starting with capability, can you foresee any barriers in this regard? This could be things like concentration, eyesight and reading..." },
            { type: "input", inputType: "text", label: "Capability considerations", stateKey: "capability" },
            { type: "input", inputType: "text", label: "Opportunity considerations", stateKey: "opportunity" },
            { type: "input", inputType: "text", label: "Motivation considerations", stateKey: "motivation-considerations" },
            { type: "input", inputType: "number", label: "Motivation out of ten", stateKey: "motivation-score", singleValue: true }
        ]
    },
    {
        id: "sdm-2",
        section: "shared-decision-making",
        items: [
            { type: "verbatim", content: "We offer appointments over the phone, video call, or in person. Bear in mind that these are all equally effective, so it really is down to your preference." },
            { type: "direction", content: "Explore capability surrounding modality and technology." }
        ]
    },
    {
        id: "sdm-3",
        section: "shared-decision-making",
        items: [
            { type: "direction", content: "Give the patient a booklet about ${treatment} for ${diagnosis}. Highlight the relevance of specific pages. This could be the explanation of CBT, testimonials, or more information about their diagnosis." }
        ]
    },
    {
        id: "sdm-4",
        section: "shared-decision-making",
        items: [
            { type: "direction", content: "Agree a plan for treatment, taking into account COM-B and modality preferences, and ensure the patient reflects it back." },
            { type: "verbatim", content: "Just to reiterate because it's really important, engaging with the materials outside of sessions is really important for the effectiveness of the treatment. So if you can find the time to read those pages of the booklet, I recommend you do." }
        ]
    },

    // ============================================================
    // 5. ENDING
    // ============================================================
    {
        id: "ending-1",
        section: "ending",
        subsection: "problem-statement",
        items: [
            { type: "verbatim", content: "What I'd like to do now is to draw all the main points we've discussed into one single summary. We call this a 'problem statement', and its very useful because it gives us a baseline or starting point for treatment. We can look back at it later to help us track your progress, see which parts are getting better, and identify if we need to make any adjustments to our plan. Does that make sense?" },
            { type: "verbatim", content: "You can write the statement yourself, or I can write it for you. Which would you prefer?" }
        ]
    },
    {
        id: "ending-2",
        section: "ending",
        subsection: "problem-statement",
        items: [
            {
                type: "direction",
                content: (state) => {
                    const getSummaryValue = (key) => {
                        const values = state.inputs[key] || [];
                        return Array.isArray(values) && values.length > 0 ? values.join(', ') : '';
                    };

                    const problem = getSummaryValue('core-problem');
                    const sensations = getSummaryValue('sensations');
                    const behaviours = getSummaryValue('behaviours');
                    const thoughts = getSummaryValue('thoughts');
                    const triggers = getSummaryValue('triggers');
                    const impactWork = getSummaryValue('impact-work');
                    const impactHome = getSummaryValue('impact-home');
                    const impactHobbies = getSummaryValue('impact-hobbies');
                    const impactSocial = getSummaryValue('impact-social');
                    const impactRelationships = getSummaryValue('impact-relationships');
                    const goals = getSummaryValue('goals');

                    let summary = `Summary for reference:\n\nProblem: ${problem}`;
                    if (triggers) summary += `\n\nTriggers: ${triggers}`;
                    if (sensations || behaviours || thoughts) {
                        summary += `\n\nSymptoms:\n  - Sensations: ${sensations || 'none recorded'}\n  - Behaviours: ${behaviours || 'none recorded'}\n  - Thoughts: ${thoughts || 'none recorded'}`;
                    }
                    if (impactWork || impactHome || impactHobbies || impactSocial || impactRelationships) {
                        summary += `\n\nImpacts:\n  - Work: ${impactWork || 'none recorded'}\n  - Home: ${impactHome || 'none recorded'}\n  - Hobbies: ${impactHobbies || 'none recorded'}\n  - Social: ${impactSocial || 'none recorded'}\n  - Relationships: ${impactRelationships || 'none recorded'}`;
                    }
                    if (goals) summary += `\n\nGoals: ${goals}`;

                    return summary;
                }
            },
            { type: "input", inputType: "text", label: "Problem statement", stateKey: "problem-statement", multiline: true, singleValue: true },
            { type: "direction", content: "Read it back to the patient and confirm it fits their experience." }
        ]
    },
    {
        id: "ending-3",
        section: "ending",
        subsection: "next-steps",
        items: [
            { type: "direction", content: "Reiterate next steps" },
            { type: "direction", content: "Ask patient to reflect back and record next steps" },
            { type: "direction", content: "Establish next contact" }
        ]
    }
];

/**
 * Get all sections
 * @returns {Array} Array of section objects
 */
function getSections() {
    return sections;
}

/**
 * Get all cards
 * @returns {Array} Array of card definition objects
 */
function getCards() {
    return cards;
}

/**
 * Check if a card is visible (passes showIf condition if present)
 * @param {Object} card - The card definition
 * @returns {boolean} True if card should be counted
 */
function isCardVisible(card) {
    if (card.showIf && typeof card.showIf === 'function') {
        return card.showIf(state);
    }
    return true;
}

/**
 * Get all visible cards matching section and subsection
 * @param {string} sectionId - The section ID
 * @param {string} subsectionId - Optional subsection ID
 * @returns {Array} Array of matching visible cards
 */
function getVisibleCards(sectionId, subsectionId) {
    return cards.filter(card => {
        if (card.section !== sectionId) return false;
        if (subsectionId && card.subsection !== subsectionId) return false;
        return isCardVisible(card);
    });
}

/**
 * Check if all cards in a group are completed
 * @param {Array} cardGroup - Array of cards to check
 * @returns {boolean} True if all cards are completed
 */
function areAllCardsComplete(cardGroup) {
    return cardGroup.length > 0 && cardGroup.every(card => state.completed[card.id] === true);
}

/**
 * Update completion status for all sections and subsections
 */
function updateSectionCompletion() {
    if (!state) return;

    sections.forEach(section => {
        if (section.subsections && section.subsections.length > 0) {
            // Update completion for each subsection
            section.subsections.forEach(subsection => {
                const visibleCards = getVisibleCards(section.id, subsection.id);
                state.sections[subsection.id] = areAllCardsComplete(visibleCards);
            });

            // Section is complete if all subsections are complete
            const allComplete = section.subsections.every(sub => state.sections[sub.id] === true);
            state.sections[section.id] = allComplete;
        } else {
            // No subsections: check section directly
            const visibleCards = getVisibleCards(section.id);
            state.sections[section.id] = areAllCardsComplete(visibleCards);
        }
    });
}
