# signature-test

전체 면적 ( 300\*200 ) 중 특정 면적 이상 서명했을 때 제출 가능하도록 처리

- `canvas` 의 `context` 에서 `imageData.data` 추출 후 index 4 단계 씩 올리면서 순환
- `imageData.data` 는 `[r, g, b, a, r, g, b, a, ...]` 순으로 `빨간색, 초록색, 파란색, 투명도, ...반복` 으로 이루어져있다.
- 4 단계 씩 올라가면서 `imageData.data` 의 `index + 3` 번째를 확인하면 해당 pixel 의 투명도 데이터를 받을 수 있다.
- 투명도 값이 0 이 아니라면 채워진 것으로 간주함.
- 채워진 칸의 개수를 찾아 `( 채워진 칸 수 / 전체 칸 수 ) * 100` 으로 계산하면 전체 면적의 몇 % 정도가 찼는지 알 수 있다.
- 사용자가 너무 적게 서명하진 않았다고 생각되는 적절한 지점을 찾아 제출 가능하도록 처리
