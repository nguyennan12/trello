export const mockData = {
  board: {
    _id: 'board-id-01',
    title: 'Super App Development - Phase 2',
    description: 'Dự án quy mô lớn với hơn 30+ đầu việc cần xử lý',
    type: 'public',
    ownerIds: ['admin-01'],
    memberIds: ['admin-01', 'm-02', 'm-03', 'm-04', 'm-05'],
    // 8 Cột để test Horizontal Scroll
    columnOrderIds: ['col-01', 'col-02', 'col-03', 'col-04', 'col-05', 'col-06', 'col-07'],
    columns: [
      {
        _id: 'col-01',
        boardId: 'board-id-01',
        title: 'Ý tưởng mới (Backlog)',
        cardOrderIds: ['c-01', 'c-02', 'c-03', 'c-04', 'c-05', 'c-06'],
        cards: [
          { _id: 'c-01', boardId: 'board-id-01', columnId: 'col-01', title: 'Nghiên cứu thị trường AI', cover: 'https://i.pinimg.com/1200x/af/91/1b/af911b8119ee0cc0d44c031be361a802.jpg', memberIds: ['admin-01'], comments: ['Dùng ChatGPT API nhé'], attachments: [] },
          { _id: 'c-02', boardId: 'board-id-01', columnId: 'col-01', title: 'Tích hợp thanh toán Apple Pay', cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'c-03', boardId: 'board-id-01', columnId: 'col-01', title: 'Thiết kế Logo mới cho mùa Tết', cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'c-04', boardId: 'board-id-01', columnId: 'col-01', title: 'Họp với bên đối tác vận chuyển', cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'c-05', boardId: 'board-id-01', columnId: 'col-01', title: 'Tối ưu SEO Landing Page', cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'c-06', boardId: 'board-id-01', columnId: 'col-01', title: 'Viết bài blog giới thiệu tính năng', cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'col-02',
        boardId: 'board-id-01',
        title: 'Đang lên kế hoạch',
        cardOrderIds: ['c-07', 'c-08', 'c-09'],
        cards: [
          { _id: 'c-07', boardId: 'board-id-01', columnId: 'col-02', title: 'Viết tài liệu PRD cho module Chat', cover: null, memberIds: ['m-02'], comments: [], attachments: [] },
          { _id: 'c-08', boardId: 'board-id-01', columnId: 'col-02', title: 'Lên danh sách API cần thiết', cover: 'https://i.pinimg.com/1200x/c5/39/50/c5395032dd3f97249a122ee73964a32f.jpg', memberIds: [], comments: [], attachments: [] },
          { _id: 'c-09', boardId: 'board-id-01', columnId: 'col-02', title: 'Chọn Tech Stack cho Microservices', cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'col-03',
        boardId: 'board-id-01',
        title: 'Đợi xử lý (To Do)',
        // Cột này rất dài để test Vertical Scroll
        cardOrderIds: ['c-10', 'c-11', 'c-12', 'c-13', 'c-14', 'c-15', 'c-16', 'c-17', 'c-18', 'c-19'],
        cards: [
          { _id: 'c-10', boardId: 'board-id-01', columnId: 'col-03', title: 'Fix bug giao diện Dark Mode', cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'c-11', boardId: 'board-id-01', columnId: 'col-03', title: 'Tối ưu hóa ảnh trên Cloudinary', cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'c-12', boardId: 'board-id-01', columnId: 'col-03', title: 'Viết API Login', cover: 'https://i.pinimg.com/736x/6a/e2/9c/6ae29cc251702aadee9cee0a36c4c410.jpg', memberIds: [], comments: [], attachments: [] },
          { _id: 'c-13', boardId: 'board-id-01', columnId: 'col-03', title: 'Viết API Register', cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'c-14', boardId: 'board-id-01', columnId: 'col-03', title: 'Viết API Logout', cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'c-15', boardId: 'board-id-01', columnId: 'col-03', title: 'Thiết kế trang Profile', cover: 'https://i.pinimg.com/736x/ac/8f/4d/ac8f4d8dd277e78dd92432c7db5fa951.jpg', memberIds: [], comments: [], attachments: [] },
          { _id: 'c-16', boardId: 'board-id-01', columnId: 'col-03', title: 'Thiết kế trang Settings', cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'c-17', boardId: 'board-id-01', columnId: 'col-03', title: 'Thiết kế trang Search', cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'c-18', boardId: 'board-id-01', columnId: 'col-03', title: 'Cài đặt Socket.io', cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'c-19', boardId: 'board-id-01', columnId: 'col-03', title: 'Cài đặt Firebase Notification', cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'col-04',
        boardId: 'board-id-01',
        title: 'Đang thực hiện (In Progress)',
        cardOrderIds: ['c-20', 'c-21'],
        cards: [
          { _id: 'c-20', boardId: 'board-id-01', columnId: 'col-04', title: 'Code tính năng Giỏ hàng', cover: 'https://i.pinimg.com/736x/d3/da/1f/d3da1fd3e3f888eed73c04b71f011e8f.jpg', memberIds: ['m-04', 'm-05'], comments: ['Sắp xong rồi'], attachments: [] },
          { _id: 'c-21', boardId: 'board-id-01', columnId: 'col-04', title: 'Refactor code redux store', cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'col-05',
        boardId: 'board-id-01',
        title: 'Đang Review Code',
        cardOrderIds: ['c-22', 'c-23'],
        cards: [
          { _id: 'c-22', boardId: 'board-id-01', columnId: 'col-05', title: 'Review PR #102: Auth module', cover: null, memberIds: ['admin-01'], comments: [], attachments: [] },
          { _id: 'c-23', boardId: 'board-id-01', columnId: 'col-05', title: 'Review PR #105: UI Header', cover: null, memberIds: ['admin-01'], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'col-06',
        boardId: 'board-id-01',
        title: 'Kiểm thử (Testing)',
        cardOrderIds: ['c-24', 'c-25', 'c-26'],
        cards: [
          { _id: 'c-24', boardId: 'board-id-01', columnId: 'col-06', title: 'Test luồng thanh toán VNPay', cover: 'https://i.pinimg.com/736x/db/f6/3d/dbf63da1e27f2d97d77a694df51d254a.jpg', memberIds: [], comments: [], attachments: [] },
          { _id: 'c-25', boardId: 'board-id-01', columnId: 'col-06', title: 'Test responsive trên iPad', cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'c-26', boardId: 'board-id-01', columnId: 'col-06', title: 'Test bảo mật SQL Injection', cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      },
      {
        _id: 'col-07',
        boardId: 'board-id-01',
        title: 'Hoàn thành (Done)',
        cardOrderIds: ['c-27', 'c-28'],
        cards: [
          { _id: 'c-27', boardId: 'board-id-01', columnId: 'col-07', title: 'Khởi tạo Repo Github', cover: null, memberIds: [], comments: [], attachments: [] },
          { _id: 'c-28', boardId: 'board-id-01', columnId: 'col-07', title: 'Cài đặt môi trường Dev', cover: null, memberIds: [], comments: [], attachments: [] }
        ]
      }
    ]
  }
}