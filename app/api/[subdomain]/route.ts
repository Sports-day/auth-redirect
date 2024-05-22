import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }: { params: { subdomain: string } }) {
    // リクエストからFormDataを取得
    const formData = await request.formData();

    // FormDataをオブジェクトに変換
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
        data[key] = value.toString();
    });

    // サブドメインを取得
    const { subdomain } = params;

    // リダイレクトURLを設定
    const redirectUrl = `http://${subdomain}.sportsday.edu.h.nc-toyama.ac.jp/api/auth/callback`;

    // リダイレクト先にFormDataを送信するためにHTML formを生成
    const form = `
        <form id="redirectForm" method="POST" action="${redirectUrl}">
            ${Object.entries(data).map(([key, value]) => `<input type="hidden" name="${key}" value="${value}" />`).join('')}
        </form>
        <script type="text/javascript">
            document.getElementById('redirectForm').submit();
        </script>
    `;

    return new NextResponse(form, {
        headers: {
            'Content-Type': 'text/html'
        }
    });
}
