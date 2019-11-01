const SLIDE_DATA = [
  {
    cropData: `<div class="crop">
    <p class="preview">1시간 전에 현대해상에서 <br>여행자보험 9,000원 결제 하셨어요.</p>
    <div class="cont">
      <h2>최근 이용내역</h2>

      <div class="list-wrap">
        <p class="date">6일 수요일 (오늘)</p>
        <div class="list">
          <div>
            <p>현대해상 여행자 보험</p>
            <span>오늘 09:13<span class="bar">|</span>일시불</span>
          </div>
          <p>19,000원</p>
        </div>
      </div>

      <div class="list-wrap">
        <p class="date">4일 월요일</p>
        <div class="list">
          <div>
            <p>현대백화점</p>
            <span>08.04 15:45<span class="bar">|</span>일시불</span>
          </div>
          <p>139,000원</p>
        </div>
      </div>

      <div class="list-wrap">
        <p class="date">4일 월요일</p>
        <div class="list">
          <div>
            <p>현대백화점</p>
            <span>08.04 15:45<span class="bar">|</span>일시불</span>
          </div>
          <p>139,000원</p>
        </div>
        <div class="list">
          <div>
            <p>현대오일뱅크</p>
            <span>08.04 11:20<span class="bar">|</span>일시불</span>
          </div>
          <p>100,000원</p>
        </div>
        <div class="list">
          <div>
            <p>CU편의점</p>
            <span>08.04 09:45<span class="bar">|</span>일시불</span>
          </div>
          <p>4,300원</p>
        </div>
      </div>

      <div class="list-wrap">
        <p class="date">2일 토요일</p>
        <div class="list">
          <div>
            <p>폴바셋</p>
            <span>08.02 12:45<span class="bar">|</span>일시불</span>
          </div>
          <p>5,800원</p>
        </div>
        <div class="list">
          <div>
            <p>아웃백스테이크하우스</p>
            <span>08.02 11:45<span class="bar">|</span>일시불</span>
          </div>
          <p>63,700원</p>
        </div>
      </div>

      <p class="more">
        <button>이용내역 더보기</button>
      </p>
    </div>
    <button class="close" onclick="window.collapse()">X</button>
  </div>`,
  },
  {
    cropData: `<div class="crop">
    <div class="image">
      <p>여행 준비는<br>마치셨나요?</p>
      <p class="desc">여행에 도움이 되는<br>머니 팁 먼저 확인하세요</p>
    </div>
    <div class="cont">
      <div>
        <h2>휴가철 현대카드 사용백서</h2>
        <p>
          '직장인에게 허락된 유일한 마약'. 여름 휴가철이 코앞입니다.
          여행지를 정하고, 코스를 짜고, 항공권과 호텔 예약까지. 정해야 할 게 한두 개가 아니죠.
          <br>기분 좋은 고민이지만, 최소한 여행지에서 신용카드와 관련된 고민은 덜 수 있도록,
          당신이 떠나기 전 미리 알아두면 좋은 신용카드 활용법을 소개합니다.
        </p>

        <h2>성수기 호텔 할인</h2>
        <ul class="box-list icon">
          <li>
            <p>현대카드 전용 프로모션 사이트<br>결제시 12% 즉시 할인</p>
          </li>
          <li>
            <p>현대카드 전용 프로모션 사이트<br>전용 쿠폰 발급</p>
          </li>
          <li>
            <p>야놀자 앱 결제시<br>M포인트 10% 사용</p>
          </li>
        </ul>
        <p class="more">
          <button>더 알아보기</button>
        </p>

        <h2>면세점 무이자 할부 혜택</h2>
        <ul class="box-list icon">
          <li>
            <p>매주 월 화목 30% 즉시 할인<br>매주 월요일 결제금액의 50%<br>M포인트 사용</p>
          </li>
          <li>
            <p>항공 여행 업종 5만원 이상<br>결제 시 2~6개월 무이자 할부<br>그 외 가맹점 ~3개월 무이자 할부</p>
          </li>
        </ul>
        <p class="more">
          <button>더 알아보기</button>
        </p>

        <h2>유의사항</h2>
        <ul class="bul-list">
          <li>M포인트 사용 혜택은 M계열카드에 한해 제공 됩니다.</li>
          <li>상기 혜택은 당사 및 제휴사 사정에 의해 변경 또는 중단 가능합니다.</li>
          <li>할인, 쿠폰 및 무이자할부 적용 기준은 해당 대상점에 따라 적용됩니다.</li>
          <li>모든 가맹점은 현대카드 가맹점 등록 업종 기준입니다.</li>
        </ul>
      </div>
    </div>
    <button class="close" onclick="window.collapse()">X</button>
  </div>`,
  },
  {
    cropData: `<div class="crop">
    <div class="image">
      <p>여행을 즐기신다면<br>Green 카드</p>
      <p class="desc">M포인트 적립, 바우처 제공,<br>프리미엄 소재 카드까지</p>
      <button>신청</button>
    </div>
    <div class="cont">
      <div>
        <h2>M포인트 적립</h2>
        <ul class="box-list">
          <li>
            <p class="num"><string>1</string>%</p>
            <p>국내외 가맹점에서 1% M포인트 적립</p>
          </li>
          <li>
            <p class="num"><string>1.5</string>배</p>
            <p>100만원 이상 이용시 1.5배 적립</p>
          </li>
          <li>
            <p class="num"><string>2</string>배</p>
            <p>200만원 이상 이용 시 2배 적립</p>
          </li>
        </ul>
        <p class="more">
          <button>더 알아보기</button>
        </p>

        <h2>M포인트 특별적립</h2>
        <ul class="box-list icon">
          <li>항공사, 여행사, 특급호텔<br>전 업종 5% 적립</li>
          <li>현대카드 My Menu앱에<br>등록된 맛집 전체 5% 적립</li>
          <li>해외 현지 및 해외<br>온라인 가맹점 5% 적립</li>
        </ul>
        <p class="more">
          <button>더 알아보기</button>
        </p>

        <div class="ad">
          <h2>바우처</h2>
          <p>M포인트로 현대카드 PRIVIA 여행, 롯데면세점,<br>국내 특급 호텔에서 사용 가능한<br>the Green 바우처 교환</p>
        </div>

        <h2>연간 리워드</h2>
        <ul class="box-list click">
          <li>
            <p>5만 M포인트 연간 보너스 적립</p>
            <span>연간 600만원 이상 이용 시 제공</span>
          </li>
          <li>
            <p>5 10만원 이용연차에 따른 차등 적용</p>
            <span>연간 600만원 이상 이용 시 제공</span>
            <span>발급 2차년도 이후 5만원 갱신 이후 10만원</span>
            <span>본인카드 연회비 면제</span>
          </li>
        </ul>

        <h2>프리미엄서비스</h2>
        <ul class="box-list icon">
          <li>가장 화폐다운 소재<br>코팔플레이트 제공</li>
          <li>항공권 무료 업그레이드 등<br>서비스 제공</li>
          <li>인천국제공항 국내<br>특급호텔 무료 발레파킹</li>
          <li>그린 회원전용<br>상담 데스크</li>
        </ul>
        <p class="more">
          <button>더 알아보기</button>
        </p>

        <h2>99%가 놓치는 혜택<br>영상으로 알아보기</h2>

        <div class="bottom">
          <h3>VISA MasterCard 서비스</h3>
          <p class="more">
            <button>더 알아보기</button>
          </p>
        </div>

      </div>
    </div>
    <button class="close" onclick="window.collapse()">X</button>
  </div>`,
  },
  {
    cropData: `<div class="crop">
    <div class="image">
      <p>여행 준비는<br>마치셨나요?</p>
      <p class="desc">여행에 도움이 되는<br>머니 팁 먼저 확인하세요</p>
    </div>
    <div class="cont">
      <div>
        <h2>휴가철 현대카드 사용백서</h2>
        <p>
          '직장인에게 허락된 유일한 마약'. 여름 휴가철이 코앞입니다.
          여행지를 정하고, 코스를 짜고, 항공권과 호텔 예약까지. 정해야 할 게 한두 개가 아니죠.
          <br>기분 좋은 고민이지만, 최소한 여행지에서 신용카드와 관련된 고민은 덜 수 있도록,
          당신이 떠나기 전 미리 알아두면 좋은 신용카드 활용법을 소개합니다.
        </p>

        <h2>성수기 호텔 할인</h2>
        <ul class="box-list icon">
          <li>
            <p>현대카드 전용 프로모션 사이트<br>결제시 12% 즉시 할인</p>
          </li>
          <li>
            <p>현대카드 전용 프로모션 사이트<br>전용 쿠폰 발급</p>
          </li>
          <li>
            <p>야놀자 앱 결제시<br>M포인트 10% 사용</p>
          </li>
        </ul>
        <p class="more">
          <button>더 알아보기</button>
        </p>

        <h2>면세점 무이자 할부 혜택</h2>
        <ul class="box-list icon">
          <li>
            <p>매주 월 화목 30% 즉시 할인<br>매주 월요일 결제금액의 50%<br>M포인트 사용</p>
          </li>
          <li>
            <p>항공 여행 업종 5만원 이상<br>결제 시 2~6개월 무이자 할부<br>그 외 가맹점 ~3개월 무이자 할부</p>
          </li>
        </ul>
        <p class="more">
          <button>더 알아보기</button>
        </p>

        <h2>유의사항</h2>
        <ul class="bul-list">
          <li>M포인트 사용 혜택은 M계열카드에 한해 제공 됩니다.</li>
          <li>상기 혜택은 당사 및 제휴사 사정에 의해 변경 또는 중단 가능합니다.</li>
          <li>할인, 쿠폰 및 무이자할부 적용 기준은 해당 대상점에 따라 적용됩니다.</li>
          <li>모든 가맹점은 현대카드 가맹점 등록 업종 기준입니다.</li>
        </ul>
      </div>
    </div>
    <button class="close" onclick="window.collapse()">X</button>
  </div>`,
  },
  {
    cropData: `<div class="crop">
    <div class="image">
      <p>TROP.COM<br>15% 할인 이벤트</p>
      <p class="desc full-txt">트립닷컴에서 현대카드로<br>결제하면 엄청난 할인이!</p>
      <p class="desc">19.07.23 ~ 08.02</p>
      <button>참여</button>
    </div>
    <button class="close" onclick="window.collapse()">X</button>
  </div>`,
  },
];

export default SLIDE_DATA;
