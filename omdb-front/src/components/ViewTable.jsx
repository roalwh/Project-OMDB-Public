import React from 'react'

function ViewTable() {
  return (
    <>
      <table className='mypage_cont__table'>
        <colgroup>
          <col style={{ width: '7%' }} />
          <col style={{ width: '9%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>술 이름</th>
            <th>평점</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>대대포 블루</td>
            <td>별</td>
            <td className='title'>집들이 선물로 딱집들이 선물로 딱</td>
            <td className='content'>깔끔하고 탄산감이 강한 막걸리_식전, 식후술로 추천깔끔하고 탄산감이 강한 막걸리_식전, 식후술로 추천깔끔하고 탄산감이 강한 막걸리_식전, 식후술로 추천</td>
            <td>2023.02.15.</td>
          </tr>
          <tr>
            <td>1</td>
            <td>대대포 블루</td>
            <td>별</td>
            <td className='title'>집들이 선물로 딱</td>
            <td className='content'>깔끔하고 탄산감이 강한 막걸리_식전, 식후술로 추천</td>
            <td>2023.02.15.</td>
          </tr>
          <tr>
            <td>1</td>
            <td>대대포 블루</td>
            <td>별</td>
            <td className='title'>집들이 선물로 딱</td>
            <td className='content'>깔끔하고 탄산감이 강한 막걸리_식전, 식후술로 추천</td>
            <td>2023.02.15.</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default ViewTable