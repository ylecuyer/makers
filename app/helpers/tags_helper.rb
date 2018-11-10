module TagsHelper
  def tag_html(tag)
    content_tag :span, class: 'tag' do
      link_to tag, "/tags/#{tag}"
    end
  end
end
