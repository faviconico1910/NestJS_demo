**Lớp 1**: Domain Layer
Nhiệm vụ: Chứa các Business Logic, nơi giúp giải quyết các vấn đề của enterprise, không import các thư viện của framework

Bao gồm: Entities, Interfaces

Quy tắc (Strict): Hoàn toàn là TypeScript thuần. Không import bất kỳ thứ gì từ NestJS, TypeORM, hay thư viện bên thứ 3 (ngoại trừ các utility thư viện dùng để hỗ trợ logic thuần).

**Lớp 2**: Application Layer
Nhiệm vụ: Nhận yêu cầu từ người dùng, gọi database qua interface để lấy dữ liệu, gọi Domain để chạy logic, rồi lưu lại, đóng vai trò điều phối

Bao gồm: Use Cases (các services), Application DTOs/Commands.

Quy tắc: Chỉ phụ thuộc vào tầng Domain. Gọi database và các dịch vụ bên ngoài thông qua Interfaces (Ports), tuyệt đối không gọi trực tiếp class Implements.

**Lớp 3**: Infrastructure Layer
Nhiệm vụ: Là nơi giao tiếp với thế giới bên ngoài: Database, Message Brokers (Kafka, RabbitMQ), External APIs (Stripe, SendGrid), thư viện bảo mật (Bcrypt, JWT).

Bao gồm: Data Models (TypeORM @Entity), Repository (phần implementation), external services, ...
Quy tắc: Các file ở đây phải implements các interfaces đã được định nghĩa ở tầng domain hoặc application.

**Lớp 4**: Presentation Layer
Nhiệm vụ: Nhận Request từ Client (HTTP REST, GraphQL, gRPC), kiểm tra định dạng dữ liệu đầu vào và trả về Response.

Bao gồm: Controllers, request DTOs, ...

Quy tắc: Chỉ được phép gọi tầng Application (Use Cases). Không được chứa logic nghiệp vụ, không được gọi trực tiếp TypeORM Entity hay Repository.
