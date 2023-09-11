import React from 'react';
import { Link } from 'react-router-dom';

export default function TermOfConditions() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-30 dark:bg-[#161d31]">
      <div className="flex flex-col bg-white rounded-lg h-3/4 w-1/2 px-10 py-10 shadow-xl dark:dark:bg-[#283046]">
        <span className="text-2xl font-bold text-primary">Điều khoản sử dụng Travel Connect</span>
        <span className="text-base text-secondary font-semibold dark:text-white mt-2">Vui lòng chấp nhận điều khoản dưới đây</span>
        <div className="flex-1 overflow-y-scroll text-sm text-secondary mt-5 mb-5 dark:text-white">
          Phân hệ phần mềm Travel Connect là tính năng thuộc phần mềm Travel Office được vận hành và phát triển bởi Công ty cổ phần Công nghệ số iTab. Ngoài việc hỗ trợ bằng các công cụ công nghệ trực tuyến, chúng tôi không tham gia vào quá trình trực tiếp sử dụng của Khách hàng. Khi Khách hàng đồng ý sử dụng Travel Connect tại doanh nghiệp mình sẽ mặc nhiên đồng ý với điều khoản sử dụng (Term of Services) này.
          <div>
            Chúng tôi sẵn sàng giải thích cho Khách hàng về các điều khoản này. Mọi thắc mắc vui lòng liên hệ theo email info@itab.com.vn
          </div>
          <div>
            iTab bảo toàn quyền chỉnh sửa nội dung các điều khoản sử dụng này tại bất kì thời điểm nào. Chúng tôi sẽ thông báo tới quý Khách hàng khi có cập nhật trong Điều khoản sử dụng.
          </div>
          <h2 className="mb-2 text-base font-semibold dark:text-white mt-2">1. Các định nghĩa</h2>
          <ul className="w-full space-y-1 list-disc list-inside dark:text-gray-400">
            <li>
              Travel office: Là nền tảng (phần mềm dịch vụ) hỗ trợ vận hành và làm việc hiệu quả trong doanh nghiệp lữu hành vừa và nhỏ, nền tảng TO gồm các sản phẩm khác nhau nhằm hỗ trợ Khách hàng vận hành và hoạt động hiệu quả.
              Danh sách chi tiết hiển thị tại mục "Sản phẩm" trên website
              <Link className="text-blue-600" to="http://traveloffice.vn">
                {' '}
                http://traveloffice.vn
              </Link>
            </li>
            <li>
              iTab: Là đơn vị sở hữu và toàn quyền khai thác nền tảng TO.
            </li>
            <li>
              Hệ thống TO (hệ thống): Là một hệ thống TO được iTAB mở quyền truy cập cho Khách hàng.
              Đây là không gian làm việc hiệu quả cho Khách hàng và các cá nhân được Khách hàng cấp quyền sử dụng.
            </li>
            <li>
              Phân hệ phần mềm Travel Connect: là một tính năng phần mềm thuộc nền tảng Travel Office, giúp hỗ trợ Doanh nghiệp kết nối thông tin, cơ hội kinh Doanh tới các Doanh nghiệp khác khi cùng sử dụng nền tảng Travel Office.
            </li>
            <li>
              Bài ghép Tour: Là nội dung được tạo bởi người dùng của Doanh nghiệp trên Travel Connect nhằm công bố thông tin về nhu cầu và được hiển thị rộng rãi trên nền tảng phần mềm cũng như có thể tìm kiếm bởi người dùng của Doanh nghiệp khác trên nền tảng.
            </li>
            <li>
              Yêu cầu ghép Tour: Là thông tin phản hồi của người dùng đối với một Bài ghép Tour cụ thể, trong đó bao gồm yêu cầu của người dùng tương ứng với các giá trị trong Bài ghép Tour.
            </li>
            <li>
              Công ty: Là các Doanh nghiệp lữ hành sử dụng nền tảng Travel Office và đồng ý tham gia Travel Connect.
            </li>
          </ul>

          <h2 className="mb-2 text-base font-semibold dark:text-white mt-2">2. Phân hệ Travel Connect</h2>
          <span>
            Travel Connect sẽ cung cấp các tính năng cho phép khách hàng:
          </span>
          <ul className="w-full space-y-1 list-disc list-inside dark:text-gray-400 mb-2">
            <li>
              Tạo bài viết từ Lead sẵn có, sử dụng dữ liệu khách hàng tiềm năng thuộc sở hữu của Doanh nghiệp và đã được ghi nhận trên hệ thống Travel Office.
            </li>
            <li>
              Tạo bài viết từ Tour khởi hành sẵn có, sử dụng dữ liệu Tour khởi hành được tổ chức bởi Doanh nghiệp và đã được ghi nhận trên hệ thống Travel Office.
            </li>
            <li>
              Tạo yêu cầu đối với các bài viết phù hợp với nhu cầu. Khởi tạo kênh kết nối giữa người dùng của hai Doanh nghiệp.
            </li>
            <li>
              Người dùng có khả năng thêm, sửa hoặc đóng các bài viết, yêu cầu.
            </li>
            <li>
              Cung cấp báo cáo theo thời gian thực về số lượng Doanh nghiệp tham gia, Bài ghép Tour, Yêu cầu ghép Tour.
            </li>
            <li>
              Cung cấp kênh chat trực tiếp giữa người tạo bài viết và người yêu cầu.
            </li>
          </ul>
          <span>
            Người dùng trực tiếp chịu trách nhiệm về tính xác thực, tính pháp lý cũng như các cam kết thương mai của các nội dung được đăng tải lên Travel Connect.
            Các tranh chấp, rủi ro phát sinh sẽ được các bên liên quan thực hiện giải quyết theo thỏa thuận riêng hoặc theo các quy định của pháp luật.
            iTab sẽ thực hiện việc duy trì, khắc phục lỗi phát sinh từ phần mềm để đảm bảo tính ổn định cũng như việc cung cấp các tính năng nêu trên.
          </span>

          <h2 className="mb-2 text-base font-semibold dark:text-white mt-2">3. Bảo vệ quyền riêng tư</h2>
          <div className="mb-1">
            iTab bảo mật toàn bộ thông tin của Khách hàng và những nội dung các tài khoản sử dụng của Khách hàng trao đổi, lưu trữ trên Travel Connect.
            Chúng tôi sẽ thực hiện và duy trì tất cả các biện pháp bảo vệ nội bộ cần thiết và trong khả năng của chúng tôi để bảo vệ cho tính bảo mật và toàn vẹn đối với dữ liệu Khách hàng.
            iTAB cam kết:
          </div>
          <ul className="w-full space-y-1 list-disc list-inside dark:text-gray-400 mb-2">
            <li>
              Không chủ động thay đổi các dữ liệu được tạo ra bởi Khách hàng.
              Điều này không bao hàm việc hệ thống phần mềm có thể tự động sửa đổi kích cỡ, định dạng dữ liệu để phù hợp với mục đích hiển thị và chức năng sử dụng.
            </li>
            <li>
              Không truy cập vào dữ liệu của Khách hàng trừ trường hợp khắc phục lỗi kỹ thuật hoặc theo yêu cầu của Khách hàng hoặc trường hợp phải tuân theo quy định của pháp luật.
            </li>
            <li>
              Không tiết lộ dữ liệu của Khách hàng cho bên thứ Ba ngoại trừ một trong các trường hợp sau:
              <ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
                <li>Có sự chấp thuận của Khách hàng;</li>
                <li>Phải tuân theo quy định của pháp luật;</li>
                <li>Thuộc trường hợp quy định tại Điều khoản sử dụng này;</li>
              </ol>
            </li>

          </ul>
          <div className="mb-1">
            Mặc dù vậy, iTab có quyền tiếp cận một cách chủ động hoặc tự động thông tin về các tài khoản đang tồn tại trên hệ thống (bao gồm Họ tên, email) và các dữ liệu khác cho một số mục đích nhất định, bao gồm:
          </div>
          <ul className="w-full space-y-1 list-disc list-inside dark:text-gray-400 mb-2">
            <li>
              Thông báo bằng email đến Khách hàng về các tính năng mới hoặc các sản phẩm mới.
            </li>
            <li>
              Thông báo bằng email đến Khách hàng về các sự kiện, chương trình khuyến mại, thông tin về sự cố sản phẩm, dịch vụ...
            </li>
            <li>
              Liên hệ trực tiếp với Khách hàng để hỗ trợ kỹ thuật hoặc các hỗ trợ khác nhằm tăng trải nghiệm người dùng.
            </li>
            <li>
              Thông báo trên hệ thống về các cập nhật liên quan tới bài viết/yêu cầu của người tạo và người yêu cầu.
            </li>
            <li>
              Hiển thị thông tin các bài viết, yêu cầu cũng như toàn bộ các thông tin liên quan phục vụ quá trình sử dụng Travel Connect.
            </li>
          </ul>
          <span>
            iTab bảo toàn quyền sử dụng tên của Khách hàng cho mục đích Marketing hoặc trong các chiến dịch quảng bá, giới thiệu sản phẩm hoặc trong các cuộc nói chuyện, trao đổi với các Khách hàng khác của iTab hoặc các Khách hàng tiềm năng khác của iTab.
          </span>
          <h2 className="mb-2 text-base font-semibold dark:text-white mt-2">4. Dữ liệu của Khách hàng và trách nhiệm của các bên</h2>
          <div className="mb-1">
            Dữ liệu của Khách hàng là mọi thông tin mà Khách hàng gửi, tải lên, truyền hoặc bằng bất kể phương thức nào giúp hiển thị thông tin đó trên Travel Connec.
            Dữ liệu đó bao gồm: các tin nhắn, các thông báo, các tập tin, các hình ảnh, các video, các ý kiến, các nhận xét, các đường dẫn, các nội dung liên quan đến công việc và tất cả mọi thông tin được hiển thị trên Travel Connect của Khách hàng; Dữ liệu của Khách hàng bao gồm cả mọi thông tin, đường dẫn, văn bản mà Khách hàng và các tài khoản sử dụng của Khách hàng nhập vào Travel Connect thông qua các nền tảng lưu trữ đám mây.
            Khách hàng có quyền sử dụng và kiểm soát dữ liệu được đăng tải trên Travel Connect. iTab cung cấp các tính năng có sẵn, theo hiện trạng và áp dụng chung cho tất cả Khách hàng. Khách hàng chịu mọi trách nhiệm cho tất cả các dữ liệu mà Khách hàng hoặc tài khoản sử dụng của Khách hàng gửi đến và/hoặc gửi đi từ Travel Connect.
          </div>
          <div className="mb-1">
            Khách hàng hiểu rằng iTab không sở hữu bất kì dữ liệu nào mà Khách hàng đăng tải lên Travel Connect; trừ các tài liệu và hoặc giao diện hướng dẫn được iTab chủ động cung cấp công khai cho Khách hàng.
          </div>
          <div className="mb-1">
            Việc quyết định đưa dữ liệu nào lên Travel là toàn quyền của Khách hàng. Tuy nhiên, những nội dung sau sẽ KHÔNG ĐƯỢC PHÉP đăng tải trên nền tảng TO:
          </div>
          <ul className="w-full space-y-1 list-disc list-inside dark:text-gray-400 mb-2">
            <li>
              Làm tổn hại, làm phiền cho người khác hoặc gây ra thương tổn đến con người và tài sản.
            </li>
            <li>
              Liên quan đến việc công bố các thông tin hoặc tài liệu lừa đảo, gây mất uy tín danh dự, quấy rối hoặc mang tính khiêu dâm.
            </li>
            <li>
              Xâm phạm các quyền riêng tư hoặc kì thị chủng tộc, tôn giáo, giới tính, người tàn tật.
            </li>
            <li>
              Xâm phạm quyền sở hữu trí tuệ hoặc các quyền sở hữu khác.
            </li>
            <li>
              Cản trở hoặc phá hỏng Travel Connect (bao gồm nhưng không giới hạn bởi việc truy cập trái phép TO thông qua bất cứ phương tiện máy móc, phần mềm).
            </li>
          </ul>
          <div className="mb-1">
            iTab có toàn quyền vô hiệu hóa quyền truy cập vào nội dung dữ liệu của Khách hàng nếu chúng tôi xác định dữ liệu được truy cập vi phạm Điều khoản này, hoặc chúng tôi nhận được đơn khiếu nại từ tài khoản sử dụng, hoặc thông báo vi phạm sở hữu trí tuệ và/hoặc thông báo nội dung có dấu hiệu vi phạm pháp luật của các cơ quan có thẩm quyền.
            Khách hàng tự chịu trách nhiệm trước pháp luật nếu sử dụng phần mềm trái với quy định của pháp luật.
          </div>

          <h2 className="mb-2 text-base font-semibold dark:text-white mt-2">5. Hỗ trợ phục hồi dữ liệu bị mất</h2>
          <div className="mb-1">
            Hiện tại iTab có hỗ trợ sao lưu dữ liệu định kỳ tự động đối với các tài khoản sử dụng Travel Connect.
            Trong trường hợp dữ liệu của Khách hàng bị mất do lỗi của iTab thì iTab có trách nhiệm hỗ trợ Khách hàng phục hồi dữ liệu về thời gian gần nhất mà hệ thống sao lưu dữ liệu tự động của iTab lưu lại. Thời gian tối đa để iTab thực hiện phục hồi dữ liệu cho Khách hàng là 8 (tám) giờ làm việc kể từ khi nhận văn bản thông báo lỗi và yêu cầu phục hồi dữ liệu từ người đại diện của Khách hàng.
          </div>

          <h2 className="mb-2 text-base font-semibold dark:text-white mt-2">6. Tạm ngừng và chấm dứt sử dụng Travel Connect</h2>
          <h3 className="mb-2 text-base font-medium dark:text-white mt-2">Thời hạn của thỏa thuận</h3>
          <div className="mb-1">
            Thỏa thuận này bắt đầu kể từ ngày Khách hàng đồng ý và chấm dứt khi tất cả các tài khoản được cấp kèm theo thỏa thuận này hết hạn sử dụng.
            Đối với trường hợp Khách hàng dùng thử, nếu Khách hàng không chuyển sang hình thức thuê bao trước khi hết hạn dùng thử, thỏa thuận này sẽ được chấm dứt khi hết hạn dùng thử.
          </div>
          <h3 className="mb-2 text-base font-medium dark:text-white mt-2">Tạm ngừng</h3>
          <div className="mb-1">
            iTab có quyền tạm ngừng việc sử dụng của Khách hàng đối với Khách hàng trong các trường hợp sau:
          </div>
          <ul className="w-full space-y-1 list-disc list-inside dark:text-gray-400 mb-2">
            <li>
              Khách hàng không thực hiện nghĩa vụ thanh toán các khoản chi phí sử dụng Khách hàng sau khi iTab đã gửi thông báo yêu cầu thanh toán 15 ngày.
            </li>
            <li>
              iTab cho rằng Travel Connect đang được Khách hàng sử dụng để tham gia vào các cuộc tấn công, gửi thư rác, các hoạt động bất hợp pháp hoặc việc sử dụng Travel Connect của Khách hàng gây nguy hại tới iTab và những đối tượng khác
            </li>
          </ul>
          <h3 className="mb-2 text-base font-medium dark:text-white mt-2">Chấm dứt thỏa thuận</h3>
          <div className="mb-1">
            Thỏa thuận được coi như chấm dứt trong các trường hợp sau:
          </div>
          <ul className="w-full space-y-1 list-disc list-inside dark:text-gray-400 mb-2">
            <li>
              iTab đơn phương chấm dứt thỏa thuận do Khách hàng không thực hiện nghĩa vụ thanh toán cho iTab theo quy định.
            </li>
            <li>
              Theo yêu cầu của tòa án và cơ quan nhà nước có thẩm quyền.
            </li>
            <li>
              Khi có thỏa thuận của Khách hàng và iTab về việc chấm dứt thỏa thuận.
            </li>
          </ul>
          <div className="mb-1">
            iTab không có nghĩa vụ hoàn trả bất kể chi phí nào mà Khách hàng đã thanh toán trong trường hợp chấm dứt thỏa thuận vì những lý do đã nêu trên.
            iTab chỉ bảo đảm duy trì dữ liệu của Khách hàng trên nền tảng Travel Office tối đa là 60 ngày kể từ ngày chấm dứt thỏa thuận.
          </div>

          <h2 className="mb-2 text-base font-semibold dark:text-white mt-2">7. Điều khoản bảo đảm và giới hạn trách nhiệm của chúng tôi</h2>
          <h3 className="mb-2 text-base font-medium dark:text-white mt-2">Từ chối đảm bảo</h3>
          <div className="mb-1">
            iTab không cam đoan, tuyên bố, hoặc bảo đảm rằng việc sử dụng nền tảng TO của Khách hàng sẽ không bị gián đoạn hoặc không bị lỗi, hoặc nền tảng TO sẽ đáp ứng yêu cầu Khách hàng hoặc tất cả các lỗi trên phần mềm và/hoặc tài liệu sẽ được sửa hoặc hệ thống tổng thể đảm bảo hoạt động của nền tảng TO (bao gồm nhưng không giới hạn: mạng internet, các mạng truyền dẫn khác, mạng nội bộ và các thiết bị của Khách hàng).
            iTab không đảm bảo dưới bất kỳ hình thức nào, dù rõ ràng hay ngầm định về các điều kiện như sự thỏa mãn về chất lượng, phù hợp cho nhu cầu sử dụng đặc thù hoặc không xâm phạm các quyền của bên thứ ba. Nền tảng TO được cung cấp dưới dạng "theo hiện trạng " và "có sẵn " cho Khách hàng sử dụng. Khách hàng sẽ chịu toàn bộ trách nhiệm trong việc xác định xem nền tảng TO hoặc thông tin được tạo ra từ nền tảng TO là đúng đắn và đáp ứng đầy đủ cho mục đích sử dụng của mình.
          </div>
          <h3 className="mb-2 text-base font-medium dark:text-white mt-2">Giới hạn về trách nhiệm pháp lý</h3>
          <div className="mb-1">
            Trong bất cứ trường hợp nào iTab đều không chịu trách nhiệm về bất kỳ các thiệt hại nào trực tiếp, gián tiếp, ngẫu nhiên hoặc mang tính chất trừng phạt,
            bao gồm nhưng không giới hạn ở các thiệt hại do mất doanh thu, mất lợi nhuận, mất lợi thế kinh doanh, do ngừng việc hoặc mất mát dữ liệu do hậu quả của:
            (1) việc sử dụng hoặc không thể sử dụng nền tảng TO;
            (2) bất kỳ các thay đổi nào được thực hiện đối với Travel Connect;
            (3)từ chối quyền truy cập hoặc biến đổi các dữ liệu;
            (4) xóa, sai hỏng, hoặc không lưu trữ dữ liệu có trên hoặc thông qua nền tảng TO;
            (5) các tuyên bố hay hành vi của bất kỳ bên thứ ba nào đối với nền tảng TO; và
            (6) bất kỳ vấn đề nào khác liên quan đến Travel Connect
          </div>

          <h2 className="mb-2 text-base font-semibold dark:text-white mt-2">8. Bất khả kháng</h2>
          <div className="mb-1">
            Sự kiện bất khả kháng là sự kiện xảy ra mang tính khách quan và nằm ngoài tầm kiểm soát của các Bên, bao gồm nhưng không giới hạn: động đất, bão, lũ, lụt, lốc, sóng thần, lở đất; hỏa hoạn;
            dịch bệnh; chiến tranh hoặc có nguy cơ xảy ra chiến tranh và các thảm họa tự nhiên khác chưa lường hết được;
            việc truy cập to.vn hoặc các subdomain của *traveloffice.vn bị gián đoạn do can thiệp bởi ISP (Internet service provider), sự thay đổi chính sách hoặc sự ngăn cấm theo các quyết định của cơ quan có thẩm quyền.
            Việc một Bên không hoàn thành nghĩa vụ của mình do sự kiện bất khả kháng sẽ không phải là cơ sở để bên kia chấm dứt hợp đồng và bồi thường thiệt hại. Tuy nhiên, Bên bị ảnh hưởng bởi sự kiện bất khả kháng có nghĩa vụ phải:
          </div>
          <ul className="w-full space-y-1 list-disc list-inside dark:text-gray-400 mb-2">
            <li>
              Tiến hành các biện pháp ngăn ngừa hợp lý và các biện pháp thay thế cần thiết để hạn chế tối đa ảnh hưởng do sự kiện bất khả kháng gây ra.
            </li>
            <li>
              Thông báo bằng văn bản cho bên kia về trường hợp được miễn trách nhiệm và những hậu quả có thể xảy ra do sự kiện bất khả kháng trong vòng 05 ngày ngay sau khi có cơ sở để xác định việc xảy ra sự kiện bất khả kháng làm ảnh hưởng trực tiếp đến khả năng thực hiện nghĩa vụ hợp đồng.
            </li>
          </ul>

          <h2 className="mb-2 text-base font-semibold dark:text-white mt-2">9. Giải quyết tranh chấp</h2>
          <div className="mb-1">
            Tất cả các tranh chấp hoặc các bất đồng phát sinh giữa 02 bên iTab và Người dùng hoặc nhiều bên giữa các Doanh nghiệp và iTab sẽ được giải quyết trên tinh thần hợp tác để cùng nhau giải quyết.
            Trong trường hợp 02 bên thương lượng không thể đạt được kết quả thì sẽ đưa ra giải quyết theo trình tự tố tụng tại Tòa án có thẩm quyền. Phán quyết của Tòa án là chung thẩm, mang quyết định cuối cùng buộc các bên phải tuân thủ.
          </div>
        </div>
        <div className="flex justify-end">
          <button type="button" className="bg-gray-200 rounded-lg text-gray-900 font-medium text-sm px-8 py-2.5 hover:shadow-lg transition-shadow">
            Huỷ
          </button>
          <Link to="/onboarding" type="button" className="px-8 py-2.5 ms-3 bg-primary text-white rounded-lg font-medium text-sm hover:shadow-lg transition-shadow">
            Tôi đồng ý
          </Link>
        </div>
      </div>
    </div>
  );
}
