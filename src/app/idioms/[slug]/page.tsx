import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

/* ─────────────────────────────────────────────────────────────
   Data — shared with /idioms/page.tsx (DRY in a future refactor)
───────────────────────────────────────────────────────────── */
interface IdiomLesson {
  idiom: string;
  meaning: string;
  pattern: string;
  context: string;
  task: string;
}

interface Module {
  week: number;
  theme: string;
  slug: string;
  description: string;
  lessons: IdiomLesson[];
}

const MODULES: Module[] = [
  {
    week: 1,
    theme: 'Emotions & Mood',
    slug: 'module-01-emotions',
    description: 'Learn to express feelings like a native speaker—from joy and anger to anxiety and calm.',
    lessons: [
      { idiom: 'over the moon', meaning: 'Extremely happy and excited.', pattern: '"I was over the moon when …" / "She\'s over the moon about …"', context: 'You finally get the IELTS score you need. You open the email and feel extremely happy, almost like you are floating.', task: 'Write one sentence about a time you were over the moon.' },
      { idiom: 'down in the dumps', meaning: 'Feeling very sad or depressed, usually for a short time.', pattern: '"He\'s been down in the dumps since …" / "I get down in the dumps when …"', context: 'You fail your driving test again. You feel sad, disappointed and a bit hopeless.', task: 'Write one real or imaginary sentence using down in the dumps.' },
      { idiom: 'on edge', meaning: 'Nervous, tense, easily annoyed.', pattern: '"I get on edge before presentations." / "Everyone was on edge during the exam."', context: 'You have a big job interview in two hours. You can\'t relax and every small noise irritates you.', task: 'When do you usually feel on edge? Write one sentence or send a short voice note.' },
      { idiom: 'take something to heart', meaning: 'Be deeply affected by something, often criticism or a comment.', pattern: '"Try not to take it to heart." / "She really took his words to heart."', context: 'Your manager gives you some criticism. It\'s not personal, but you keep thinking about it all day and feel hurt.', task: 'Write a sentence where someone takes something to heart and then changes their behaviour.' },
      { idiom: 'have mixed feelings', meaning: 'Feel both positive and negative emotions at the same time.', pattern: '"I have mixed feelings about moving abroad." / "She had mixed feelings when she heard the news."', context: 'You get a job offer in another country. You\'re excited, but also scared to leave family and friends.', task: 'Write one sentence about something you have mixed feelings about.' },
      { idiom: 'on top of the world', meaning: 'Feeling extremely happy and successful.', pattern: '"I felt on top of the world when …" / "She\'s on top of the world after …"', context: 'Your small project suddenly goes viral. People love it and you feel powerful and full of joy.', task: 'Describe a moment when you would feel on top of the world.' },
      { idiom: 'see red', meaning: 'Suddenly become very angry.', pattern: '"I saw red when I realised what he\'d done." / "She sees red if people interrupt her."', context: 'You discover your flatmate used your laptop without asking and deleted your work by mistake.', task: 'Write a sentence about a situation that would make you see red.' },
      { idiom: 'go to pieces', meaning: 'Lose control emotionally; break down after a shock or loss.', pattern: '"He went to pieces when he heard the news." / "She goes to pieces in emergencies."', context: 'A very calm, strong person gets terrible news and suddenly starts crying and shaking.', task: 'Write one sentence using go to pieces (real or fictional).' },
      { idiom: 'bottle things up', meaning: 'Hide your emotions and not express them.', pattern: '"He bottles everything up until he explodes." / "Don\'t bottle your feelings up—talk to someone."', context: 'When you feel upset, you never talk to anyone. You keep everything inside until you explode.', task: 'Are you someone who bottles things up or not? Write one sentence.' },
      { idiom: 'keep your cool', meaning: 'Stay calm and not get angry or upset in a difficult situation.', pattern: '"She kept her cool during the crisis." / "Try to keep your cool when the examiner interrupts you."', context: 'Everyone in the meeting is shouting and stressed. One person stays calm and speaks clearly.', task: 'Describe a stressful situation where you managed to keep your cool—or where you didn\'t!' },
    ],
  },
  {
    week: 2,
    theme: 'Work & Productivity',
    slug: 'module-02-work',
    description: 'Sound confident in meetings, emails, and office conversations with natural work idioms.',
    lessons: [
      { idiom: 'hit the ground running', meaning: 'Start something quickly and with a lot of energy, without wasting time.', pattern: '"We need someone who can hit the ground running." / "She hit the ground running in her new role."', context: 'It\'s your first day in a new job. Instead of slowly learning things, you start working immediately and get a lot done.', task: 'Write one sentence with hit the ground running about work or study.' },
      { idiom: 'on the back burner', meaning: 'Decided to deal with something later because other things are more urgent.', pattern: '"I\'ve put my Spanish course on the back burner." / "The plan is on the back burner for now."', context: 'You have a personal project, but urgent client work appears, so you delay the project for now.', task: 'What have you put on the back burner recently? Write one sentence.' },
      { idiom: 'up to your ears in work', meaning: 'Extremely busy, with too much to do.', pattern: '"I\'m up to my ears in work." / Variations: "up to my neck / eyes in work."', context: 'Your boss gives you extra tasks. You already have deadlines. You feel completely overloaded.', task: 'Write one sentence about a time you were up to your ears in work or study.' },
      { idiom: 'pull your weight', meaning: 'Do your fair share of the work.', pattern: '"Everyone has to pull their weight." / "He isn\'t pulling his weight on this project."', context: 'You are in a group project. Two people do everything, and one person does almost nothing.', task: 'Write a sentence where someone is not pulling their weight.' },
      { idiom: 'have a lot on your plate', meaning: 'Have many responsibilities or tasks to deal with.', pattern: '"I\'ve got a lot on my plate this week." / "She has too much on her plate already."', context: 'Your manager asks you to take another project, but you already have deadlines, meetings, and family responsibilities.', task: 'Write one sentence about a week when you had a lot on your plate.' },
      { idiom: 'be snowed under', meaning: 'Have so much work that you feel buried.', pattern: '"I\'m snowed under with emails today." / "We\'re snowed under at the end of the month."', context: 'Your inbox is full, your phone keeps ringing, and more tasks arrive every hour.', task: 'Use snowed under in one sentence about study or work.' },
      { idiom: 'burn the midnight oil', meaning: 'Work late into the night.', pattern: '"I had to burn the midnight oil to meet the deadline." / "She\'s been burning the midnight oil all week."', context: 'You have an important deadline tomorrow and you stay up very late to finish the report.', task: 'Write one sentence about a time you burned the midnight oil.' },
      { idiom: 'get the ball rolling', meaning: 'Start an activity or process.', pattern: '"Let\'s get the ball rolling with a quick brainstorm." / "Who wants to get the ball rolling on this task?"', context: 'Your team keeps talking about ideas, but nobody actually starts the project. You want to begin.', task: 'Write a sentence using get the ball rolling in a work or study context.' },
      { idiom: 'back to the drawing board', meaning: 'Start again and redesign something because the first attempt failed.', pattern: '"The plan didn\'t work, so it\'s back to the drawing board." / "Our first draft was rejected—back to the drawing board."', context: 'You present a new product idea, but the client hates it. You have to invent a completely new plan.', task: 'Give one example where you had to go back to the drawing board.' },
      { idiom: 'go the extra mile', meaning: 'Make more effort than is expected to achieve something, especially to help others.', pattern: '"She always goes the extra mile for her students." / "If you go the extra mile, you\'ll stand out at work."', context: 'A colleague doesn\'t just finish their own work; they also help others and improve the process.', task: 'Write one sentence about a time you went the extra mile—or someone else did.' },
    ],
  },
  {
    week: 3,
    theme: 'Risk & Decision-Making',
    slug: 'module-03-risk',
    description: 'Talk about bold choices, calculated risks, and difficult decisions naturally.',
    lessons: [
      { idiom: 'play it by ear', meaning: 'Decide what to do as events happen, not in advance.', pattern: '"Let\'s play it by ear and see how the day goes."', context: 'Plans are uncertain; you decide what to do step by step depending on the situation.', task: 'Write one sentence using play it by ear.' },
      { idiom: 'go out on a limb', meaning: 'Take a risk by supporting someone or something that might fail.', pattern: '"I\'m going out on a limb and saying we\'ll finish early."', context: 'Someone supports an unpopular idea or makes a bold prediction.', task: 'Write one sentence using go out on a limb.' },
      { idiom: 'throw caution to the wind', meaning: 'Stop being careful and do something risky.', pattern: '"She threw caution to the wind and quit her job."', context: 'Someone usually careful decides to do something risky or spontaneous.', task: 'Write one sentence using throw caution to the wind.' },
      { idiom: 'touch-and-go', meaning: 'Very uncertain; could easily fail.', pattern: '"The exam was touch-and-go, but I passed."', context: 'A situation where success is uncertain until the very end (exam, surgery, rescue).', task: 'Describe a touch-and-go situation you experienced.' },
      { idiom: 'take the plunge', meaning: 'Finally do something risky after hesitating.', pattern: '"She finally took the plunge and started her own business."', context: 'You\'ve been thinking about a big change for months. One day you just decide to do it.', task: 'What is something you\'ve been thinking about taking the plunge on?' },
      { idiom: 'stick your neck out', meaning: 'Risk criticism by doing or saying something bold.', pattern: '"He stuck his neck out to defend her in the meeting."', context: 'Everyone is silent, but one person speaks up and defends an unpopular position.', task: 'Write one sentence about a time someone stuck their neck out.' },
      { idiom: 'hedge your bets', meaning: 'Reduce risk by supporting more than one option.', pattern: '"She applied to five universities to hedge her bets."', context: 'You\'re not sure which plan will work, so you prepare two or three at the same time.', task: 'Write a sentence using hedge your bets in a real-life context.' },
      { idiom: 'bite the bullet', meaning: 'Endure a painful situation because it is unavoidable.', pattern: '"I just had to bite the bullet and apologise."', context: 'Something unpleasant has to be done. You stop avoiding it and just do it.', task: 'Write one sentence about a time you had to bite the bullet.' },
      { idiom: 'a leap of faith', meaning: 'Doing something without certainty it will work.', pattern: '"Moving to a new country was a real leap of faith."', context: 'You make a big decision without any guarantee of success.', task: 'Describe a leap of faith you\'ve taken or would consider taking.' },
      { idiom: 'weigh up the pros and cons', meaning: 'Carefully consider advantages and disadvantages.', pattern: '"I spent a week weighing up the pros and cons before deciding."', context: 'A big decision is in front of you. You make a list of reasons for and against.', task: 'Write one sentence using weigh up the pros and cons about a real decision.' },
    ],
  },
  {
    week: 4,
    theme: 'Relationships & Conflict',
    slug: 'module-04-relationships',
    description: 'Describe how people connect, clash, and make up—in real English.',
    lessons: [
      { idiom: 'hit it off', meaning: 'Quickly become friends or have a good connection.', pattern: '"We hit it off as soon as we started talking."', context: 'Two people meet and immediately like each other.', task: 'Write one sentence about a time you hit it off with someone.' },
      { idiom: 'on the same wavelength', meaning: 'Think in a similar way; understand each other well.', pattern: '"My co-teacher and I are on the same wavelength."', context: 'Two colleagues understand each other easily and agree on many things.', task: 'Write a sentence about someone you are on the same wavelength with.' },
      { idiom: 'give someone the cold shoulder', meaning: 'Deliberately ignore someone or be unfriendly.', pattern: '"After the argument, he gave me the cold shoulder."', context: 'Someone is angry and starts ignoring a friend.', task: 'Write one sentence using give someone the cold shoulder.' },
      { idiom: 'in hot water', meaning: 'In serious trouble.', pattern: '"I\'ll be in hot water if I miss this deadline."', context: 'Someone breaks company rules and gets called to the manager\'s office.', task: 'Write one sentence using in hot water.' },
      { idiom: 'bury the hatchet', meaning: 'End a disagreement and make peace.', pattern: '"After months of not speaking, they finally buried the hatchet."', context: 'Two people who argued decide to forgive each other and move on.', task: 'Write one sentence about two people who buried the hatchet.' },
      { idiom: 'get on like a house on fire', meaning: 'Immediately have a close, energetic friendship.', pattern: '"They got on like a house on fire from the very first day."', context: 'Two new flatmates meet and instantly become close friends.', task: 'Write one sentence using get on like a house on fire.' },
      { idiom: 'rub someone up the wrong way', meaning: 'Irritate or annoy someone unintentionally.', pattern: '"His tone really rubbed me up the wrong way."', context: 'Someone speaks in a way that annoys people without meaning to.', task: 'Write a sentence about something or someone that rubs you up the wrong way.' },
      { idiom: 'patch things up', meaning: 'Repair a damaged relationship.', pattern: '"They patched things up after a long conversation."', context: 'Two friends who fell out decide to talk and fix their friendship.', task: 'Write one sentence using patch things up.' },
      { idiom: 'fall out with someone', meaning: 'Have an argument that damages a friendship.', pattern: '"I fell out with my best friend over something silly."', context: 'A small disagreement grows into a serious argument that damages a friendship.', task: 'Write one sentence using fall out with someone.' },
      { idiom: "be at each other's throats", meaning: 'Argue fiercely and continuously.', pattern: '"The two managers were at each other\'s throats all week."', context: 'Two colleagues disagree on everything and argue constantly in every meeting.', task: "Write one sentence using be at each other's throats." },
    ],
  },
  {
    week: 5,
    theme: 'Time & Planning',
    slug: 'module-05-time',
    description: 'Master native expressions for deadlines, delays, urgency, and scheduling.',
    lessons: [
      { idiom: 'last-minute', meaning: 'Happening very close to the deadline.', pattern: '"He always does everything at the last minute."', context: 'Someone always starts tasks just before the deadline.', task: 'Write one sentence using last-minute.' },
      { idiom: 'in the long run', meaning: 'After a long period; considering the future results.', pattern: '"It\'s hard now, but in the long run it will pay off."', context: 'A decision is difficult now but will be beneficial over time.', task: 'Write one sentence using in the long run about a personal choice.' },
      { idiom: 'around the corner', meaning: 'Happening very soon.', pattern: '"The exam is just around the corner."', context: 'A big event or deadline is coming soon.', task: 'Write one sentence using around the corner.' },
      { idiom: 'call it a day', meaning: 'Stop working on something for now.', pattern: '"Let\'s call it a day and continue tomorrow."', context: 'People are tired after working for hours and decide to stop.', task: 'Write one sentence about when you last called it a day.' },
      { idiom: 'beat the clock', meaning: 'Finish something before the deadline.', pattern: '"We just managed to beat the clock and submit on time."', context: 'Your team is racing to finish before the deadline. You make it with seconds to spare.', task: 'Write one sentence using beat the clock.' },
      { idiom: 'in the nick of time', meaning: 'At the very last possible moment.', pattern: '"She arrived in the nick of time to catch the train."', context: 'Someone almost misses something but gets there just before it\'s too late.', task: 'Write one sentence using in the nick of time.' },
      { idiom: 'behind schedule', meaning: 'Later than planned.', pattern: '"The project is three weeks behind schedule."', context: 'A construction project is taking longer than expected.', task: 'Write one sentence using behind schedule.' },
      { idiom: 'a race against time', meaning: 'Trying urgently to do something before a deadline.', pattern: '"It was a race against time to finish the report."', context: 'You have only two hours to complete something that normally takes a full day.', task: 'Describe a race against time situation you have experienced.' },
      { idiom: 'buy time', meaning: 'Delay something to gain more time.', pattern: '"We asked extra questions to buy time before the presentation."', context: 'You are not ready to answer. You ask a question to delay and give yourself more time to think.', task: 'Write one sentence using buy time.' },
      { idiom: 'make up for lost time', meaning: 'Work harder or faster to compensate for delays.', pattern: '"After the holiday, I had to work extra hard to make up for lost time."', context: 'You were ill for a week and missed a lot. Now you work extra hard to catch up.', task: 'Write one sentence using make up for lost time.' },
    ],
  },
  {
    week: 6,
    theme: 'Thinking & Learning',
    slug: 'module-06-thinking',
    description: 'Express ideas, memory, confusion, and understanding the way native speakers do.',
    lessons: [
      { idiom: 'food for thought', meaning: 'Something that makes you think carefully.', pattern: '"Her comment gave me a lot of food for thought."', context: 'A TED talk gives you new ideas to think about.', task: 'Write one sentence using food for thought.' },
      { idiom: 'in two minds', meaning: 'Unable to decide; having mixed feelings.', pattern: '"I\'m in two minds about changing jobs."', context: 'You cannot decide whether to move abroad or stay.', task: 'Write one sentence about something you are in two minds about.' },
      { idiom: 'hit the nail on the head', meaning: 'Describe exactly what is causing a situation.', pattern: '"You hit the nail on the head with that analysis."', context: 'Someone gives a perfect explanation of the problem.', task: 'Write one sentence using hit the nail on the head.' },
      { idiom: 'learn the ropes', meaning: 'Learn how to do a job or activity.', pattern: '"It took me a month to learn the ropes."', context: 'A new employee is slowly understanding how the company works.', task: 'Write one sentence about learning the ropes somewhere.' },
      { idiom: 'think outside the box', meaning: 'Approach a problem in a creative, unconventional way.', pattern: '"We need to think outside the box to solve this."', context: 'The usual solutions are not working. The team needs a completely new approach.', task: 'Write one sentence using think outside the box.' },
      { idiom: 'draw a blank', meaning: 'Be unable to remember or think of something.', pattern: '"I drew a blank when she asked me the date."', context: 'Someone asks you a simple question but your mind goes completely empty.', task: 'Write one sentence about a time you drew a blank.' },
      { idiom: 'get your head around something', meaning: 'Begin to understand something complex.', pattern: '"I\'m still trying to get my head around the grammar rule."', context: 'A concept in class is so complex that it takes a long time to understand.', task: 'Write one sentence using get your head around something.' },
      { idiom: 'on the tip of your tongue', meaning: 'Almost able to remember a word or name.', pattern: '"The word is on the tip of my tongue—I just can\'t think of it!"', context: 'You know a word but cannot say it. You feel it is almost there.', task: 'Write one sentence using on the tip of your tongue.' },
      { idiom: "pick someone's brain", meaning: "Ask someone for their ideas or knowledge.", pattern: '"Can I pick your brain about the project?"', context: 'You want advice from an expert, so you ask them to share their knowledge informally.', task: "Write one sentence using pick someone's brain." },
      { idiom: 'come to grips with', meaning: 'Start to deal with or understand a difficult situation.', pattern: '"It took a while to come to grips with the new software."', context: 'A new system at work is very difficult. After a few weeks you finally start to understand it.', task: 'Write one sentence using come to grips with.' },
    ],
  },
  {
    week: 7,
    theme: 'Money & Value',
    slug: 'module-07-money',
    description: 'Talk about prices, spending, budgeting, and value without sounding textbook.',
    lessons: [
      { idiom: 'cost an arm and a leg', meaning: 'Be very expensive.', pattern: '"That car costs an arm and a leg."', context: 'A very expensive phone or holiday.', task: 'Write one sentence using cost an arm and a leg.' },
      { idiom: 'bang for your buck', meaning: 'Good value for the money you spend.', pattern: '"This laptop gives you more bang for your buck."', context: 'Comparing two products; one is better value for money.', task: 'Write one sentence using bang for your buck.' },
      { idiom: 'tighten your belt', meaning: 'Spend less money because you have less.', pattern: '"We had to tighten our belts after the company closed."', context: 'Someone loses their job and must spend less.', task: 'Write one sentence using tighten your belt.' },
      { idiom: 'in the red', meaning: 'Owing money or having less than zero in your account.', pattern: '"The company has been in the red for months."', context: 'A business is losing money.', task: 'Write one sentence using in the red.' },
      { idiom: 'make ends meet', meaning: 'Have just enough money to cover expenses.', pattern: '"It was hard to make ends meet on one salary."', context: 'A family struggles to pay all their bills with their income.', task: 'Write one sentence using make ends meet.' },
      { idiom: 'break even', meaning: 'Make neither profit nor loss.', pattern: '"After six months, the business started to break even."', context: 'A new shop finally earns exactly as much as it spends.', task: 'Write one sentence using break even.' },
      { idiom: 'fork out', meaning: 'Pay a large or unwanted amount of money.', pattern: '"I had to fork out £300 for new tyres."', context: 'Something breaks unexpectedly and you have to pay a lot to fix it.', task: 'Write one sentence using fork out.' },
      { idiom: 'a steal', meaning: 'Something that is very cheap relative to its value.', pattern: '"At that price, it\'s a steal."', context: 'You find a high-quality product at a very low price.', task: 'Write one sentence using a steal.' },
      { idiom: 'money to burn', meaning: 'Have so much money that spending freely is easy.', pattern: '"He buys designer clothes like he has money to burn."', context: 'Someone spends money on luxuries without any concern.', task: 'Write one sentence using money to burn.' },
      { idiom: 'foot the bill', meaning: 'Pay the total cost for something.', pattern: '"The company footed the bill for the whole conference."', context: 'One person or organisation pays for everyone\'s expenses.', task: 'Write one sentence using foot the bill.' },
    ],
  },
  {
    week: 8,
    theme: 'Communication & Honesty',
    slug: 'module-08-communication',
    description: 'Express directness, misunderstanding, and clarity in conversation naturally.',
    lessons: [
      { idiom: 'get straight to the point', meaning: 'Talk about the most important thing immediately.', pattern: '"Let me get straight to the point: we need to cut costs."', context: 'A meeting is too long; someone wants to hear the main idea.', task: 'Write one sentence using get straight to the point.' },
      { idiom: 'beat around the bush', meaning: 'Avoid talking about the main topic.', pattern: '"Stop beating around the bush and tell me the truth."', context: 'Someone avoids saying something directly, especially bad news.', task: 'Write one sentence using beat around the bush.' },
      { idiom: 'keep someone in the loop', meaning: 'Give someone regular information and updates.', pattern: '"Please keep me in the loop about the project."', context: 'A manager regularly updates the team on changes.', task: 'Write one sentence using keep someone in the loop.' },
      { idiom: 'take something with a pinch of salt', meaning: 'Not completely believe something; be sceptical.', pattern: '"Take his stories with a pinch of salt."', context: 'A friend tells dramatic stories; you don\'t fully believe them.', task: 'Write one sentence using take something with a pinch of salt.' },
      { idiom: 'read between the lines', meaning: 'Understand the hidden meaning of something.', pattern: '"If you read between the lines, it\'s clear she\'s unhappy."', context: 'An email seems polite on the surface but you sense something is wrong.', task: 'Write one sentence using read between the lines.' },
      { idiom: 'speak your mind', meaning: 'Say what you think honestly, even if it\'s uncomfortable.', pattern: '"She always speaks her mind, even in difficult meetings."', context: 'In a team meeting, everyone is quiet but one person says exactly what they think.', task: 'Write one sentence using speak your mind.' },
      { idiom: 'talk at cross purposes', meaning: 'Misunderstand each other because you are discussing different things.', pattern: '"We were talking at cross purposes for ten minutes before realising it."', context: 'Two people are arguing but they are actually talking about two different topics.', task: 'Write one sentence using talk at cross purposes.' },
      { idiom: 'get the wrong end of the stick', meaning: 'Misunderstand a situation completely.', pattern: '"He got the wrong end of the stick and thought the meeting was cancelled."', context: 'Someone hears part of a conversation and completely misunderstands it.', task: 'Write one sentence using get the wrong end of the stick.' },
      { idiom: 'put your foot in your mouth', meaning: 'Say something accidentally rude or embarrassing.', pattern: '"I really put my foot in my mouth when I asked about his ex."', context: 'Without thinking, you say something that offends or embarrasses someone.', task: 'Write one sentence using put your foot in your mouth.' },
      { idiom: 'talk someone through something', meaning: 'Explain a process step by step to help someone.', pattern: '"She talked me through the whole application process."', context: 'A colleague helps you understand a complex task by explaining each step.', task: 'Write one sentence using talk someone through something.' },
    ],
  },
];

export async function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const mod = MODULES.find((m) => m.slug === slug);
  if (!mod) return {};
  return {
    title: `Week ${mod.week}: ${mod.theme}`,
    description: mod.description,
  };
}

export default async function ModulePage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const mod = MODULES.find((m) => m.slug === slug);
  if (!mod) notFound();

  const prev = MODULES.find((m) => m.week === mod.week - 1);
  const next = MODULES.find((m) => m.week === mod.week + 1);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <Link
          href="/idioms"
          className="inline-flex items-center gap-1.5 text-sm mb-5"
          style={{ color: 'var(--color-text-muted)' }}
        >
          ← All modules
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary-dark)',
            }}
          >
            Week {mod.week}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-faint)' }}>
            {mod.lessons.length} idioms
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
          {mod.theme}
        </h1>
        <p className="max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
          {mod.description}
        </p>
      </div>

      {/* Lesson cards */}
      <div className="space-y-6">
        {mod.lessons.map((lesson, i) => (
          <div
            key={lesson.idiom}
            className="rounded-2xl border p-6 space-y-4"
            style={{
              background: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            {/* Idiom number + name */}
            <div className="flex items-start gap-3">
              <span
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                style={{ background: 'var(--color-primary)' }}
              >
                {i + 1}
              </span>
              <div>
                <h2
                  className="text-xl font-bold leading-tight"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  &ldquo;{lesson.idiom}&rdquo;
                </h2>
                <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  {lesson.meaning}
                </p>
              </div>
            </div>

            {/* WhatsApp message 1 — Context */}
            <div
              className="rounded-xl p-4 text-sm"
              style={{
                background: 'var(--color-surface-2)',
                borderLeft: '3px solid var(--color-primary)',
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--color-primary)' }}>
                💬 Situation
              </p>
              <p style={{ color: 'var(--color-text)' }}>{lesson.context}</p>
            </div>

            {/* WhatsApp message 2 — Pattern */}
            <div
              className="rounded-xl p-4 text-sm"
              style={{
                background: 'var(--color-accent-light)',
                borderLeft: '3px solid var(--color-accent)',
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: 'var(--color-accent)' }}>
                📝 Pattern
              </p>
              <p style={{ color: 'var(--color-text)' }}>{lesson.pattern}</p>
            </div>

            {/* WhatsApp message 3 — Your turn */}
            <div
              className="rounded-xl p-4 text-sm"
              style={{
                background: '#f0fdf4',
                borderLeft: '3px solid #16a34a',
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: '#16a34a' }}>
                ✅ Your turn
              </p>
              <p style={{ color: 'var(--color-text)' }}>{lesson.task}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next nav */}
      <div className="flex justify-between gap-4 pt-4">
        {prev ? (
          <Link
            href={`/idioms/${prev.slug}`}
            className="flex-1 rounded-xl border p-4 text-sm hover:border-[var(--color-primary)] transition-colors"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <span className="block text-xs mb-0.5" style={{ color: 'var(--color-text-faint)' }}>← Previous</span>
            <span className="font-semibold">{prev.theme}</span>
          </Link>
        ) : <div className="flex-1" />}

        {next ? (
          <Link
            href={`/idioms/${next.slug}`}
            className="flex-1 rounded-xl border p-4 text-sm text-right hover:border-[var(--color-primary)] transition-colors"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <span className="block text-xs mb-0.5" style={{ color: 'var(--color-text-faint)' }}>Next →</span>
            <span className="font-semibold">{next.theme}</span>
          </Link>
        ) : <div className="flex-1" />}
      </div>
    </div>
  );
}
