// ============================================================
//  사이트에 보이는 모든 문구는 이 파일에서 수정하면 돼요.
//
//  - 따옴표(" ") 안의 글자만 바꾸세요.
//  - 줄을 바꾸고 싶으면 \n 을 넣으세요. 빈 줄은 \n\n 이에요.
//  - label = 버튼 글자, to = 누르면 가는 페이지 (to는 바꾸지 마세요)
//  - icon = 글 위에 보이는 이모지 (지우고 싶으면 "" 로)
//  - tone = 버튼 색 (good 민트, soft 라벤더, sad 피치, home 회색)
//  - GitHub에서 수정하고 Commit changes를 누르면 1~2분 뒤 반영돼요.
// ============================================================

window.SITE_TEXTS = {
  // 브라우저 탭에 보이는 제목
  title: "수현에게",

  pages: {
    // P0 홈
    home: {
      icon: "💌",
      text: "이걸 만든 이유는 장난치는거 아니고, 내 시간과 노력으로 진심을 전달하고 싶었어. 장문만 받으면 답답하고 또 생각나서 화만 날까봐. 조금이나마 얘가 사과하고 싶구나, 노력중이구나, 라고 받아주면 좋겠어. 그치만 다 싫고 짜증나고 화나고 장난같이 보인다면 말해줘 진심으로 문자보낼게",
      buttons: [
        { label: "일단 궁금은 하니까 지금 볼까?", to: "choice", tone: "good" },
        { label: "기분이 별로야 지금 안볼래", to: "later", tone: "sad" },
      ],
    },

    // P1 선택
    choice: {
      icon: "🤔",
      text: "",
      buttons: [
        { label: "아무 일 없었던 듯이 넘어갈래", to: "skip", tone: "good" },
        { label: "사과 받을래", to: "apology", tone: "soft" },
      ],
    },

    // P2 넘어가기
    skip: {
      icon: "✈️",
      text: "우리 상하이 일정 이번주에 시간 내서 짜보자!",
      buttons: [
        { label: "근데 사과가 뭘까?", to: "apology", tone: "soft" },
        { label: "이 일은 묻자", to: "reason", tone: "good" },
      ],
    },

    // P3 만든 이유  (나중에 작성)
    reason: {
      icon: "🌱",
      text: "(여기에 이걸 만든 이유를 적어주세요)",
      buttons: [],
    },

    // P4 사과문  (나중에 작성)
    apology: {
      icon: "🙇",
      text: "(여기에 사과문을 적어주세요)\n\n긴 글도 괜찮아요.",
      buttons: [
        { label: "넌 진짜 잘해라 용서", to: "forgive", tone: "good" },
        { label: "아직 안풀림 더해봐", to: "more", tone: "soft" },
        { label: "넌 글렀어", to: "nope", tone: "sad" },
      ],
    },

    // P5 용서
    forgive: {
      icon: "🥹",
      text: "다 읽고 용서를 하신 아량 넓은 수현씨\n카톡을 보내면 빠른 답장으로 맞이하겠습니다.\n전화는 더 좋구요~",
      buttons: [],
    },

    // P6 더해봐  (나중에 작성)
    more: {
      icon: "🫠",
      text: "(여기에 '아직 안풀림 더해봐'를 눌렀을 때 보여줄 글을 적어주세요)",
      buttons: [
        { label: "사과문 다시 보기", to: "apology", tone: "soft" },
      ],
    },

    // P7 글렀어
    nope: {
      icon: "😢",
      text: "저의 사과가 만족스럽지 못하군요.\n더 잘 해보겠습니다.\n노여움을 조금 푸시고 하루 뒤에 다시 찾아와주세요.",
      buttons: [
        { label: "홈으로 가기", to: "home", tone: "home" },
      ],
    },

    // P8 안 볼래
    later: {
      icon: "🥲",
      text: "으휴 역시 나는 글러먹었어..\n수현 나중에.. 꼭 다시 와줘",
      buttons: [
        { label: "홈으로", to: "home", tone: "home" },
      ],
    },
  },
};
