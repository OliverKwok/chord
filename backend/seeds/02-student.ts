import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // check before insert instead of deleting table
  async function seedRow(table: string, rowData: object) {
    let row = await knex(table).select('id').where(rowData).first();
    if (!row) {
      let rows = await knex(table).insert(rowData).returning('id');
      row = rows[0];
    }
    return row;
  }

  // Inserts seed entries
  await seedRow('student', {
    name: '鄺昇溢',
    is_quitted: false,
    gender: 'M',
    level: 'P2',
    school: '聖公會阮鄭夢芹小學',
    phone: '65776636',
    phone_relation: 'mother',
    phone2: '90772827',
    phone2_relation: '婆',
    remark:
      'ADHD有吃藥，常投訴同學，數學不錯，功課能自己完成，能力OK，媽媽擔心字體問題能主動做事，數學特別叻，但是中英相對較數學弱，但IQ高，做事時會很專心，但有時候多小動作撩人，會投訴人。',
  });
  await seedRow('student', {
    name: '姚峻禹',
    is_quitted: false,
    gender: 'M',
    level: 'P3',
    school: '銘恩小學',
    phone: '64909092',
    phone_relation: 'mother',
    phone2: '64607007',
    phone2_relation: 'self',
    remark:
      'SEN，有學習障礙，讀寫，2024再見政府CHECK，數學可自行完成，騷擾同學，搞搞震，好嘈，要人不停關注，常常講休息時間，及討可否早走',
  });
  await seedRow('student', {
    name: '余昊霆',
    is_quitted: false,
    gender: 'M',
    level: 'P3',
    school: '大埔浸信會公立學校',
    phone: '93829347',
    phone_relation: 'mother',
    phone2: '95830751',
    phone2_relation: 'self',
    remark: 'SEN，數學可大致自行完成，中英常未能完成，寫字慢，媽在家教好勞氣',
  });
  await seedRow('student', {
    name: '蘇仲賢',
    is_quitted: false,
    gender: 'M',
    level: 'P5',
    school: '大埔舊墟公立學校(寶湖道)',
    phone: '51667761',
    phone_relation: 'mother',
    phone2: '53199227',
    phone2_relation: 'self',
    remark:
      '英文能力弱，自覺做中文功課，中文能力好，字體不好 願意學，但每次放學後都要吃東西，休息夠才有心情完成功課。',
  });
  await seedRow('student', {
    name: '徐然',
    is_quitted: false,
    gender: 'F',
    level: 'P6',
    school: '聖公會阮鄭夢芹銀禧小學',
    phone: '54009053',
    phone_relation: 'mother',
    phone2: '68761503',
    phone2_relation: 'self',
    remark:
      '專注力較弱，會睡覺，做一會兒停一會兒，數學運算大意，英文弱，1點後會帶飯到補習社食，功課可自行完成，有時要在補習社zoom 中文呈分試成績佳，但部分詞語忘記怎樣寫出。英文的填充如知道意思和方法能自己完成，閱讀理解都是較弱，因為所認知的詞彙少。數學，懂得加減乘除，準確率高。但分數及圓，小數轉換% 不熟。',
  });
  await seedRow('student', {
    name: '楊程光',
    is_quitted: false,
    gender: 'M',
    level: 'P4',
    school: '大埔舊墟公立學校(寶湖道)',
    phone: '53228082',
    phone_relation: 'mother',
    phone2: '53963444',
    phone2_relation: 'self',
    remark:
      'SEN，中文字完全未能閱讀及默寫，英文只懂得一止簡單的生字，也不能默寫；數學計算還可以，但交字題不懂解題，做功課全都導師教，特打中作及中文作句。家長知道學生功課由導師寫。平日會有幾天在補習社上zoom，zoom不計算功課班時段，全日制時會取消zoom。',
  });
  await seedRow('student', {
    name: '黃天悠',
    is_quitted: false,
    gender: 'M',
    level: 'P6',
    school: '德萃小學',
    phone: '55779547',
    phone_relation: 'mother',
    remark:
      '功課不多，大部分能自己完成。全英文功課，科學功課，常識功課等，多數來到補習社是做練習，及溫書。現在教PART PARTICIPALE。',
  });
  await seedRow('student', {
    name: '李思靖',
    is_quitted: false,
    gender: 'F',
    level: 'P1',
    school: '聖公會阮鄭夢芹銀禧小學',
    phone: '51115929',
    phone_relation: 'mother',
  });
  await seedRow('student', {
    name: '傅倫纓',
    is_quitted: false,
    gender: 'M',
    level: 'P1',
    school: '聖公會阮鄭夢芹銀禧小學',
    phone: '90615222',
    phone_relation: 'mother',
  });
  await seedRow('student', {
    name: '鄧子涵',
    is_quitted: false,
    gender: 'M',
    level: 'P2',
    school: '大埔循道衛理小學',
    phone: '96301360',
    phone_relation: 'mother',
    remark:
      '英文73特別叻，一年級只考一次考試，讀卷能力弱，中文60-70分，中文閱讀理解較差，數理63分不好，成績不穩定',
  });
  await seedRow('student', {
    name: '譚智灦',
    is_quitted: false,
    gender: 'M',
    level: 'P1',
    school: '英華小學',
    phone: '64631898',
    phone_relation: 'mother',
    remark:
      '懂得拼音，而且閱讀能力高。英文基礎良好。時間掌握良好 今個月的數卷成績不錯90分左右。數學運算良好，只是不小心看題目。',
  });
  await seedRow('student', {
    name: '洪志澄',
    is_quitted: false,
    gender: 'M',
    level: 'P4',
    school: '保良局田家炳千禧小學',
    phone: '98189674',
    phone_relation: '姨媽',
    remark:
      'SEN，學校時要在特別室考試，姨媽要求小四留級，現重讀小四，英文7/100，數學需要逐題讀，中文23/100，常識36/100',
  });
  await seedRow('student', {
    name: '譚家傑',
    is_quitted: false,
    gender: 'M',
    level: 'S2',
    school: '新界鄉議局大埔區中學',
    phone: '98189674',
    phone_relation: '姨媽',
    remark: '怕羞，自覺做練習，不熟TENSE',
  });
  await seedRow('student', {
    name: '楊程匡',
    is_quitted: false,
    gender: 'M',
    level: 'S3',
    school: '靈糧堂劉梅軒中學',
    phone: '53228082',
    phone_relation: 'mother',
    remark: 'SEN，做卷較慢，部分英文生字未能讀出正確讀音，不熟悉TENSE',
  });
  await seedRow('student', {
    name: '蘇逸軒',
    is_quitted: false,
    gender: 'M',
    level: 'P3',
    school: '大埔浸信會公立學校',
    phone: '61715784',
    phone_relation: 'mother',
    remark: '做卷慢，時間控制較弱，',
  });
  await seedRow('student', {
    name: '何卓琛',
    is_quitted: false,
    gender: 'M',
    level: 'P3',
    school: '大埔舊墟公立學校(寶湖道)',
    phone: '92580743',
    phone_relation: 'mother',
    remark:
      '閱讀理解較弱，一些相近字混淆，但英文基礎OK 只要解釋英文的文法規律及用法，就可以按規律完成，但初學的過去式未太熟。懂得閱讀簡單的英文句子及生字，詞庫不多。',
  });

  await seedRow('student', {
    name: '吳沛霖',
    is_quitted: false,
    gender: 'M',
    level: 'P5',
    school: '大埔舊墟公立學校(寶湖道)',
    phone: '59888249',
    phone_relation: 'mother',
    remark: '字體端正，樂於學習，懂得閱讀部分英文句子。',
  });

  await seedRow('student', {
    name: '施順搖',
    is_quitted: false,
    gender: 'F',
    level: 'P3',
    school: '黃福鑾紀念學校',
    phone: '96382083',
    phone_relation: 'mother',
    remark:
      '數學科時間宗能掌握，應用題時不懂得何時要加, 何時要減，加減運算可以，但應用題及轉彎題目較弱。',
  });
  await seedRow('student', {
    name: '易智熙',
    is_quitted: false,
    gender: 'M',
    level: 'P3',
    phone: '95359366',
    phone_relation: 'mother',
  });

  await seedRow('student', {
    name: '李虹臻',
    is_quitted: false,
    gender: 'F',
    level: 'P3',
    school: '大埔舊墟公立學校(寶湖道)',
    phone: '96427686',
    phone_relation: 'mother',
  });

  await seedRow('student', {
    name: '蘇家洋',
    is_quitted: false,
    gender: 'M',
    level: 'P2',
    school: '聖公會阮鄭夢芹銀禧小學',
    phone: '95227011',
    phone_relation: 'mother',
  });

  await seedRow('student', {
    name: '郭曉澄',
    is_quitted: false,
    gender: 'F',
    level: 'P4',
    school: '聖公會阮鄭夢芹小學',
    phone: '91624369',
    phone_relation: 'mother',
    remark:
      '中文90分, 英文接近100分, 中文作文未能運用已學詞語，媽媽想加強中文能力扛底日後呈分試，做卷慢，閱讀理解時間控制較弱。中文多錯別字，閱讀理解好，乖巧，中文基礎不錯，中作未有太多詞彙，未懂得運用出來',
  });

  await seedRow('student', {
    name: '鄭朗曦',
    is_quitted: false,
    gender: 'M',
    level: 'P2',
    school: '大埔舊墟公立學校(寶湖道)',
    phone: '98398532',
    phone_relation: 'mother',
    remark:
      '不用計算朗曦的考卷分數，媽媽十分緊張分數，所以小朋友都很緊張分數，中文多錯別字，但整體能力OＫ。要求操數學，應用題加減混合未太掌握，有剩餘時間，不懂得如何檢查卷，仍有多不小心的錯誤。主動問同學仔叫咩名，人較多嘴，喜歡投訴人，問同學仔叫甚麼名字，然後向媽媽投訴。今個月英文卷有進步。',
  });
}
